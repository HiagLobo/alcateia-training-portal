import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllTrainingPaths, upsertTrainingPaths, getAllRanking, upsertRanking } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Data persistence endpoints for admin panel
  data: router({
    // Training paths endpoints
    getTrainingPaths: publicProcedure.query(async () => {
      const paths = await getAllTrainingPaths();
      return paths.map(p => ({
        ...p,
        content: p.content ? JSON.parse(p.content) : null,
      }));
    }),

    saveTrainingPaths: publicProcedure
      .input(z.array(z.object({
        id: z.number().optional(),
        name: z.string(),
        description: z.string().optional(),
        content: z.any().optional(),
        icon: z.string().optional(),
        color: z.string().optional(),
      })))
      .mutation(async ({ input }) => {
        const pathsToSave = input.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || null,
          content: p.content ? JSON.stringify(p.content) : null,
          icon: p.icon || null,
          color: p.color || null,
        }));
        
        await upsertTrainingPaths(pathsToSave);
        return { success: true };
      }),

    // Ranking endpoints
    getRanking: publicProcedure.query(async () => {
      const rankingData = await getAllRanking();
      return rankingData.map(r => ({
        ...r,
        data: r.data ? JSON.parse(r.data) : null,
      }));
    }),

    saveRanking: publicProcedure
      .input(z.array(z.object({
        id: z.number().optional(),
        name: z.string(),
        position: z.number().optional(),
        photo: z.string().optional(),
        description: z.string().optional(),
        data: z.any().optional(),
      })))
      .mutation(async ({ input }) => {
        const rankingToSave = input.map(r => ({
          id: r.id,
          name: r.name,
          position: r.position || null,
          photo: r.photo || null,
          description: r.description || null,
          data: r.data ? JSON.stringify(r.data) : null,
        }));
        
        await upsertRanking(rankingToSave);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
