import React from "react";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import Link from "next/link";
import Head from "next/head";
import DashboardLayout from "~/components/layout/dashboard-layout";

export default function UserTravelHistoryPage() {
  return (
    <>
      <Head>
        <title>User Travel History</title>
      </Head>

      <DashboardLayout
        type="user"
        loading={false}
        heading="User Travel History"
        text="User Travel History"
        buttonLabel="Profile"
      >
        <DashboardShell>
          <DashboardHeader
            heading="User Travel History"
            text="User Travel History"
          >
            <Link href="/dashboard/user/profile">
              <Button variant="outline">
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </DashboardHeader>
        </DashboardShell>
      </DashboardLayout>
    </>
  );
}
