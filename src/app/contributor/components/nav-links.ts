import {
  Bell,
  Bookmark,
  Compass,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRoundPlus,
} from "lucide-react";

const GeneralLinks = [
  { id: 1, title: "Dashboard", href: "/contributor", icon: LayoutDashboard },
  { id: 2, title: "Notifs", href: "/notification", icon: Bell },
  { id: 3, title: "Discover", href: "/discover", icon: Compass },
  { id: 4, title: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { id: 5, title: "Add friend", href: "/add-friend", icon: UserRoundPlus },
];

const settingsLinks = [
  { id: 6, title: "Settings", href: "/settings", icon: Settings },
  { id: 7, title: "Logout", href: "/logout", icon: LogOut },
];

export { GeneralLinks, settingsLinks };
