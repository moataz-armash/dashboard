import {
  Bell,
  Bookmark,
  Compass,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  UserRoundPlus,
} from "lucide-react";

const GeneralLinks = [
  { id: 1, title: "Dashboard", href: "/contributor", icon: LayoutDashboard },
  { id: 2, title: "Cart", href: "/contributor/cart", icon: ShoppingCart },
  { id: 3, title: "Discover", href: "/discover", icon: Compass },
  { id: 4, title: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { id: 5, title: "Add friend", href: "/add-friend", icon: UserRoundPlus },
];

const settingsLinks = [
  { id: 6, title: "Settings", href: "/settings", icon: Settings },
  { id: 7, title: "Logout", href: "/logout", icon: LogOut },
];

export { GeneralLinks, settingsLinks };
