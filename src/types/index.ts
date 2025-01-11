import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface LinkData {
  id: string;
  metaImageUrl: string,
  icon: string,
  title: string;
  urlId: string;
  urlExpiry: Date;
  shortUrl: string;
  originalUrl: string;
  totalClicks: number;
  clickDetails: clickDetails[];
  tags: string[];
  selected?: boolean; // Optional for the select-all feature
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface clickDetails {
  country: string;
  city: string;
  device: string;
  browser: string;
  os: string;
  referrer: string;
  timestamp: string;
  _id: string;
}

export interface ApiLinksResponse {
  data: LinkData[];
}

export interface ApiSingleLinkResponse {
  data: LinkData;
}
