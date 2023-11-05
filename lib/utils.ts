import {UrlQueryParams, RemoveUrlQueryParams} from '@/types';
import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date | string): string => {
  const now: Date = new Date();

  let timeDifference: number;

  if (createdAt instanceof Date) {
    timeDifference = now.getTime() - createdAt.getTime();
  } else {
    timeDifference = now.getTime() - new Date(createdAt).getTime();
  }

  // Define time intervals in milliseconds
  const timeUnits: {
    unit: string;
    milliseconds: number;
  }[] = [
    {unit: 'year', milliseconds: 365 * 24 * 60 * 60 * 1000},
    {unit: 'month', milliseconds: 30 * 24 * 60 * 60 * 1000},
    {unit: 'week', milliseconds: 7 * 24 * 60 * 60 * 1000},
    {unit: 'day', milliseconds: 24 * 60 * 60 * 1000},
    {unit: 'hour', milliseconds: 60 * 60 * 1000},
    {unit: 'minute', milliseconds: 60 * 1000},
    {unit: 'second', milliseconds: 1000},
  ];

  for (const {unit, milliseconds} of timeUnits) {
    const time: number = Math.floor(timeDifference / milliseconds);
    if (time >= 1) {
      return `${time} ${unit}${time === 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

export const formUrlQuery = ({params, key, value}: UrlQueryParams): string => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {skipNull: true}
  );
};

export const removeKeysFromQuery = ({params, keysToRemove}: RemoveUrlQueryParams): string => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach(key => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {skipNull: true}
  );
};
