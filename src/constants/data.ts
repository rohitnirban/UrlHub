import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard/home',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Short Url',
    href: '/dashboard/urls',
    icon: 'url',
    label: 'Short Url'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'settings'
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/admin/home',
    icon: 'dashboard',
    label: 'Home'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: 'user',
    label: 'All Users'
  },
  {
    title: 'Urls',
    href: '/admin/urls',
    icon: 'url',
    label: 'All Urls'
  },
  {
    title: 'Free Urls',
    href: '/admin/free-urls',
    icon: 'url',
    label: 'All Free Urls'
  },
];
