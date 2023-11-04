import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const visaApplicationRouter = createTRPCRouter({
  getAllVisaApplications: protectedProcedure.query(async ({ ctx: { db } }) => {
    const data = await db.visaApplication.findMany({});

    return data;
  }),

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

  takeDecesionOnApplication: protectedProcedure
    .input(
      z.object({
        visaApplicaitionId: z.string().min(1),
        accept: z.boolean(),
      }),
    )
    .mutation(async ({ ctx: { auth, db }, input }) => {
      const visaApplication = await db.visaApplication.findUnique({
        where: {
          id: input.visaApplicaitionId,
        },
      });

      if (!visaApplication) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (input.accept) {
        const newPassportEntry = await db.passportEntry.create({
          data: {
            userId: visaApplication.userId,
            country: visaApplication.country,
            validFrom: visaApplication.entryDate,
            validTill: visaApplication.exitDate,
            visaApplicationId: visaApplication.id,

            entryDate: visaApplication.entryDate,
            exitDate: visaApplication.exitDate,
          },
        });
      }

      const newVisaApplication = await db.visaApplication.update({
        where: {
          id: visaApplication.id,
        },
        data: {
          status: input.accept ? "ACCEPTED" : "REJECTED",
        },
      });

      return newVisaApplication;
    }),
});
