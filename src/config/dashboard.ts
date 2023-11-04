import type { DashboardConfig } from "~/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "User",
      href: "/dashboard/user",
    },
    {
      title: "Consulate",
      href: "/dashboard/admin",
    },
  ],
  userSidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard/user/",
      icon: "home",
    },
    {
      title: "Travel History",
      href: "/dashboard/user/travel-history",
      icon: "home",
    },
    {
      title: "Profile",
      href: "/dashboard/user/profile",
      icon: "home",
    },
  ],
  adminSidebarNav: [],
  sidebarNav: [],
  sidebarNavBidder: [],
};
