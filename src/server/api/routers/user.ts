import { clerkClient } from "@clerk/nextjs";
import { type User as ClerkUser } from "@clerk/nextjs/dist/types/server";
import { User as PrismaUser } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  isUserCreated: protectedProcedure.query(async ({ ctx: { db, auth } }) => {
    const user: ClerkUser = await clerkClient.users.getUser(auth.userId!);

    console.log(user);

    const dbUser = await db.user.findUnique({
      where: {
        // email: user.emailAddresses[0]?.emailAddress,
        clerkUserId: auth.userId!,
      },
      select: {
        isProfileCreated: true,
      },
    });

    // if (!user.emailAddresses[0]?.emailAddress) {
    //   throw new TRPCError({
    //     code: "UNAUTHORIZED",
    //     message: "Please use an account with email",
    //   });
    // }

    return {
      isProfileCreated: dbUser?.isProfileCreated ?? false,
    };
  }),

  createUser: protectedProcedure
    .input(
      z.object({
        dob: z.date(),
        phone: z.string().min(10).max(13),

        country: z.string().min(1),
        region: z.string().min(1),
        city: z.string().min(1),
        postal_code: z.string().min(1),
        address: z.string().min(1),

        nationalIdType: z.string().min(1),
        nationalId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx: { auth, db }, input }) => {
      const clerkUser: ClerkUser = await clerkClient.users.getUser(
        auth.userId!,
      );

      const dbUser = await db.user.findUnique({
        where: {
          // email: clerkUser.emailAddresses[0]?.emailAddress,
          clerkUserId: auth.userId!,
        },
      });

      if (dbUser?.clerkUserId) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Account already existis",
        });
      }

      if (!clerkUser.emailAddresses[0]?.emailAddress) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please use an account with email",
        });
      }

      const newUser = await db.user.create({
        data: {
          email: clerkUser.emailAddresses[0]?.emailAddress,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`,
          phone: input.phone,
          dob: input.dob,
          clerkUserId: auth.userId!,

          country: input.country,
          region: input.region,
          city: input.city,
          address: input.address,
          postal_code: input.postal_code,

          nationalIdType: input.nationalIdType,
          nationalId: input.nationalId,

          isProfileCreated: true,
          isProfileVerified: false,
        },
      });

      return newUser;
    }),

  getUserData: protectedProcedure.query(async ({ ctx: { db, auth } }) => {
    const dbUser = await db.user.findUnique({
      where: {
        clerkUserId: auth.userId!,
      },
    });

    if (!dbUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User does not exists",
      });
    }

    return {
      userData: dbUser,
    };
  }),
});
