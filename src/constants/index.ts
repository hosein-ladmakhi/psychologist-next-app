export const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export const DAYS_OF_WEEK = {
  "6": "شنبه",
  "7": "یکشنبه",
  "1": "دوشنبه",
  "2": "سه شنبه",
  "3": "چهارشنبه",
  "4": "پنجشنبه",
  "5": "جمعه",
};

export const DAYS_OF_WEEK_KEYS = [6, 7, 1, 2, 3, 4, 5];

export const APP_HEADER_MENU_ITEMS: { label: string; href: string }[] = [
  {
    href: "/",
    label: "ادمین ها",
  },
  {
    href: "/therapists",
    label: "پزشکان",
  },
  {
    href: "/patients",
    label: "بیماران",
  },
  {
    href: "/orders",
    label: "رزرو ها",
  },
  {
    href: "/locations",
    label: "مکان ها",
  },
  {
    href: "/categories",
    label: "زمینه های تخصصی",
  },
  {
    href: "/tickets",
    label: "تیکت ها",
  },
];
