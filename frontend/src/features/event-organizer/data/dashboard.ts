import type { DashboardActivity, DashboardQuickAction } from "../types";

export const QUICK_ACTIONS: DashboardQuickAction[] = [
  {
    name: "Create Event",
    href: "/events/create",
    desc: "Launch a new competition",
    icon: "plus",
  },
  {
    name: "Event Schedule",
    href: "/events/schedule",
    desc: "Manage event timetable",
    icon: "calendar-days",
  },
  {
    name: "Live Results",
    href: "/events/live-results",
    desc: "Real-time race updates",
    icon: "radio",
  },
  {
    name: "Final Results",
    href: "/events/results",
    desc: "Official standings",
    icon: "trophy",
  },
];

export const DASHBOARD_ACTIVITY: DashboardActivity[] = [
  {
    text: "National 5000m & 10000m Trials started streaming live",
    time: "18m ago",
    type: "Live",
  },
  {
    text: "Addis Ababa International Marathon approved by Federation",
    time: "2h ago",
    type: "Approval",
  },
  {
    text: "Schedule updated for the 55th National Championships",
    time: "1d ago",
    type: "Update",
  },
  {
    text: "Final results published for Oromia Regional Championship",
    time: "2d ago",
    type: "Results",
  },
];
