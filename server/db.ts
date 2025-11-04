import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, trainingPaths, InsertTrainingPath, TrainingPath, userProgress, InsertUserProgress, UserProgressRecord, ranking, InsertRanking, RankingRecord } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Training Paths helpers
export async function getAllTrainingPaths(): Promise<TrainingPath[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get training paths: database not available");
    return [];
  }

  return await db.select().from(trainingPaths);
}

export async function upsertTrainingPaths(paths: InsertTrainingPath[]): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert training paths: database not available");
    return;
  }

  try {
    // Delete all existing paths and insert new ones
    await db.delete(trainingPaths);
    if (paths.length > 0) {
      await db.insert(trainingPaths).values(paths);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert training paths:", error);
    throw error;
  }
}

// User Progress helpers
export async function getUserProgress(userId: number, pathId: number): Promise<UserProgressRecord | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user progress: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId) && eq(userProgress.pathId, pathId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function upsertUserProgress(progress: InsertUserProgress): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user progress: database not available");
    return;
  }

  try {
    const existing = await getUserProgress(progress.userId, progress.pathId);
    if (existing) {
      await db
        .update(userProgress)
        .set(progress)
        .where(eq(userProgress.id, existing.id));
    } else {
      await db.insert(userProgress).values(progress);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user progress:", error);
    throw error;
  }
}

// Ranking helpers
export async function getAllRanking(): Promise<RankingRecord[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get ranking: database not available");
    return [];
  }

  return await db.select().from(ranking);
}

export async function upsertRanking(rankingData: InsertRanking[]): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert ranking: database not available");
    return;
  }

  try {
    // Delete all existing ranking and insert new ones
    await db.delete(ranking);
    if (rankingData.length > 0) {
      await db.insert(ranking).values(rankingData);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert ranking:", error);
    throw error;
  }
}
