import type {INavLink} from '@/types';

export const sidebarLinks: INavLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: '/assets/icons/people.svg',
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create Post',
  },
];

export const bottombarLinks: INavLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create',
  },
];

export const ERROR_ALERT_PROPS = {
  title: 'Error Occured',
  description: 'Something went wrong. Please try again later.',
  link: '/',
  linkTitle: 'Explore Posts',
  imgSrc: '/assets/icons/error.svg',
};
