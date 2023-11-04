import React from "react";
import { DashboardShell } from "@/components/shell";
import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import Head from "next/head";
import DashboardLayout from "~/components/layout/dashboard-layout";
import { api } from "~/utils/api";
import { formatDate } from "~/lib/utils";

export default function UserProfilePage() {
  const { data, isLoading } =
    api.visaApplication.getVisaApplications.useQuery();

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>

      <DashboardLayout
        type="user"
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

        <Table>
          <TableCaption>A list of all available bids.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Visiting Country</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Exit</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map(
              ({ country, entryDate, exitDate, status, createdAt, id }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{country}</TableCell>
                  <TableCell>{formatDate(entryDate)}</TableCell>
                  <TableCell>{formatDate(exitDate)}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/visaapplication/${id}`} className="mr-2">
                      <Button className="rounded-full">
                        <Icons.info className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </DashboardLayout>
    </>
  );
}
