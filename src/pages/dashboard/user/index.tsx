import React from "react";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import Link from "next/link";
import Head from "next/head";
import DashboardLayout from "~/components/layout/dashboard-layout";
import { api } from "~/utils/api";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { formatDate } from "~/lib/utils";
import { useUser } from "@clerk/nextjs";

export default function UserDashboardPage() {
  const { user } = useUser();

  const { data: userData, isLoading: userDataLoading } =
    api.user.getUserData.useQuery();

  function DataItem({
    label,
    value,
  }: {
    label: string;
    value?: string | null;
  }) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-md font-bold capitalize">{value ?? "-"}</p>
      </div>
    );
  }

  const getFileNo = () =>
    `<<<<${userData?.userData.country}<<<<${userData?.userData.name
      .split(" ")
      .join("<<<")}<<<<<<<<<<<${userData?.userData.id}<<<<<<<${userData
      ?.userData.nationalIdType}<<<${userData?.userData
      .nationalId}<<<<<<<<${userData?.userData.email}<<<<<<<`.toUpperCase();

  return (
    <>
      <Head>
        <title>User Dashboard</title>
      </Head>

      <DashboardLayout
        type="user"
        loading={false}
        heading="Dashboard"
        text="User Dashboard"
        buttonLabel="Profile"
      >
        <DashboardShell>
          <DashboardHeader heading="User Dashboard" text="User Dashboard">
            <Link href="/dashboard/user/profile">
              <Button variant="outline">
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </DashboardHeader>
        </DashboardShell>

        <Card className="pt-6">
          <CardContent>
            <div className="grid grid-cols-3 gap-8">
              <div>
                {user?.hasImage ? (
                  <img src={user?.imageUrl} className="rounded-lg" />
                ) : (
                  <div className="h-100 w-100 rounded-lg bg-slate-700 p-6"></div>
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-y-4">
                <DataItem label="Name" value={userData?.userData.name} />
                <DataItem
                  label="Date of Birth"
                  value={formatDate(userData?.userData.dob)}
                />
                <DataItem label="City" value={userData?.userData.city} />
                <DataItem label="State" value={userData?.userData.region} />
                <DataItem label="Country" value={userData?.userData.country} />
              </div>
              <p className="w-100 col-span-3 break-words">{getFileNo()}</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    </>
  );
}
