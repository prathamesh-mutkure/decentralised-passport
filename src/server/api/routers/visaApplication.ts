import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const visaApplicationRouter = createTRPCRouter({
  getVisaApplications: protectedProcedure.query(
    async ({ ctx: { db, auth } }) => {
      const dbUser = await db.user.findUnique({
        where: {
          clerkUserId: auth.userId!,
        },
      });

      if (!dbUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const data = await db.visaApplication.findMany({
        where: {
          userId: dbUser.id,
        },
      });

      return data;
    },
  ),

  submitVisaForm: protectedProcedure
    .input(
      z.object({
        country: z.string().min(1),
        entryDate: z.date(),
        exitDate: z.date(),
        supportingDoc: z.string(),
      }),
    )
    .mutation(async ({ ctx: { auth, db }, input }) => {
      const dbUser = await db.user.findUnique({
        where: {
          clerkUserId: auth.userId!,
        },
      });

      if (!dbUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const newVisaApplication = await db.visaApplication.create({
        data: {
          country: input.country,
          entryDate: input.entryDate,
          exitDate: input.exitDate,
          supportingDoc: input.supportingDoc,
          userId: dbUser.id,
        },
      });

      return newVisaApplication;
    }),
});
