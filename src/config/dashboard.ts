import type { DashboardConfig } from "~/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "List",
      href: "/dashboard/lister",
    },
    {
      title: "Bid",
      href: "/dashboard/bidder",
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard/lister/stats",
      icon: "home",
    },

    {
      title: "My Contracts",
      href: "/dashboard/lister",
      icon: "users",
    },
    {
      title: "Create Contract",
      href: "/dashboard/lister/contract/add",
      icon: "package",
    },
  ],
  sidebarNavBidder: [
    {
      title: "Dashboard",
      href: "/dashboard/bidder",
      icon: "home",
    },
    {
      title: "My Bids",
      href: "/dashboard/bidder/bids",
      icon: "users",
    },
    {
      title: "All Bids",
      href: "/dashboard/bidder/all-bids",
      icon: "package",
    },
  ],
};
