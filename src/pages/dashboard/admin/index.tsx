import React from "react";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import Link from "next/link";
import Head from "next/head";
import DashboardLayout from "~/components/layout/dashboard-layout";
import { api } from "~/utils/api";
import { VisaApplicationTable } from "../user/visa";

export default function AdminDashboardPage() {
  const { data, isLoading } =
    api.visaApplication.getAllVisaApplications.useQuery();

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <DashboardLayout
        type="admin"
        loading={isLoading}
        heading="Visa Applications"
        text="Find all your visa application here"
        buttonLabel="New Visa Application"
      >
        <DashboardShell>
          <DashboardHeader
            heading="Visa Applications"
            text="Find all your visa application here"
          >
            <Link href="/dashboard/user/visa/apply">
              <Button variant="outline">
                <Icons.edit className="mr-2 h-4 w-4" />
                New Visa Application
              </Button>
            </Link>
          </DashboardHeader>
        </DashboardShell>

        <VisaApplicationTable items={data ?? []} admin={true} />
      </DashboardLayout>
    </>
  );
}
