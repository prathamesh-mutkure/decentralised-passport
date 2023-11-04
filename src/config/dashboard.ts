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
      title: "Digital Passport",
      href: "/dashboard/user/",
      icon: "home",
    },
    {
      title: "Visa Applications",
      href: "/dashboard/user/visa",
      icon: "home",
    },
    {
      title: "Apply for visa",
      href: "/dashboard/user/visa/form",
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
