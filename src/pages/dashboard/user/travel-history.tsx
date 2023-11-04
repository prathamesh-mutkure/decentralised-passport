import React from "react";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import Link from "next/link";
import Head from "next/head";
import DashboardLayout from "~/components/layout/dashboard-layout";
import { Chrono } from "react-chrono";
import { api } from "~/utils/api";
import { formatDate } from "~/lib/utils";

export default function UserTravelHistoryPage() {
  const { data, isLoading } =
    api.passportRouter.getUserPassportEntries.useQuery();

  return (
    <>
      <Head>
        <title>User Travel History</title>
      </Head>

      <DashboardLayout
        type="user"
        loading={isLoading}
        heading="User Travel History"
        text="User Travel History"
        buttonLabel="View Passport"
      >
        <DashboardShell>
          <DashboardHeader
            heading="User Travel History"
            text="User Travel History"
          >
            <Link href="/dashboard/user/">
              <Button variant="outline">
                <Icons.info className="mr-2 h-4 w-4" />
                View Passport
              </Button>
            </Link>
          </DashboardHeader>
        </DashboardShell>

        <div className="mt-12">
          {(data?.length ?? 0) > 0 ? (
            <Chrono
              items={data?.map(({ country, validFrom, validTill, id }) => ({
                title: `${formatDate(validFrom)} (${country})`,
                cardTitle: country,
                cardSubtitle: `ID: ${id}`,
                cardDetailedText: `This visa is valid from ${formatDate(
                  validFrom,
                )} to ${formatDate(validTill)}`,
              }))}
              mode="VERTICAL_ALTERNATING"
            />
          ) : (
            <p>No Travel History</p>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
