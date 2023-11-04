import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const passportRouter = createTRPCRouter({
  getUserPassportEntries: protectedProcedure.query(
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

      const data = await db.passportEntry.findMany({
        where: {
          userId: dbUser.id,
        },
      });

      return data;
    },
  ),
});
