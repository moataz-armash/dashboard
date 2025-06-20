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
  {
    id: 1,
    title: "Dashboard",
    href: "/contributor",
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    id: 2,
    title: "Cart",
    href: "/contributor/cart",
    icon: ShoppingCart,
    disabled: false,
  },
  {
    id: 3,
    title: "Discover",
    href: "/discover",
    icon: Compass,
    disabled: true,
  },
  {
    id: 4,
    title: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
    disabled: true,
  },
  {
    id: 5,
    title: "Add friend",
    href: "/add-friend",
    icon: UserRoundPlus,
    disabled: true,
  },
];

const settingsLinks = [
  {
    id: 6,
    title: "Settings",
    href: "/settings",
    icon: Settings,
    disabled: true,
  },
  { id: 7, title: "Logout", href: "/logout", icon: LogOut, disabled: false },
];

export { GeneralLinks, settingsLinks };
