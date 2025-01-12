/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

// export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}


export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const incomeSchema = z.object({
  name: z.string().min(2, { message: 'Income source must be at least 2 characters.' }),
  amount:  z.preprocess(
    (value) => (typeof value === 'string' ? parseFloat(value) : value),
    z.number().positive({ message: 'Amount must be a positive number.' })
  ),
  frequency:  z.preprocess(
    (value) => (typeof value === 'string' ? parseFloat(value) : value),
    z.number().positive({ message: 'Amount must be a positive number.' })
  ),
  receivedts: z.date().optional(),
  description: z.string().max(500, { message: 'Description must not exceed 500 characters.' }).optional(),
  paymentMethod: z.enum(['1', '2', '3', '4']),
  category: z.enum(['1', '2', '3', '4']),
  fileName: z.string().min(2, { message: 'Income source must be at least 2 characters.' }),
  //fileName: z.instanceof(File).optional(),
})

export const expensesSchema = z.object({
  name: z.string().min(2, { message: 'Expenses source must be at least 2 characters.' }),
  amount:  z.preprocess(
    (value) => (typeof value === 'string' ? parseFloat(value) : value),
    z.number().positive({ message: 'Amount must be a positive number.' })
  ),
  frequency:  z.preprocess(
    (value) => (typeof value === 'string' ? parseFloat(value) : value),
    z.number().positive({ message: 'Amount must be a positive number.' })
  ),
  issuedts: z.date().optional(),
  description: z.string().max(500, { message: 'Description must not exceed 500 characters.' }).optional(),
  paymentMethod: z.enum(['1', '2', '3', '4']),
  category: z.enum(['1', '2', '3', '4']),
  fileName: z.string().min(2, { message: 'Expenses source must be at least 2 characters.' }),
  //fileName: z.instanceof(File).optional(),
})

export const customerSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  companyName: z.string().min(2, { message: 'Company Name must be at least 2 characters.' }),
  displayName: z.string().min(2, { message: 'Display Name must be at least 2 characters.' }),
  email: z.string().min(2, { message: 'Please insert a correct email format' }),
  mobileNo: z.string().min(2, { message: 'Please insert a correct mobile No format' }),
  customerType: z.enum(['1', '2', '3']),
  billingAddress: z.string().min(2, { message: 'Billing Address must be at least 2 characters.' }),
  shippingAddress: z.string().min(2, { message: 'Shipping Address must be at least 2 characters.' }),
  receivedts: z.date().optional(),
  remarks: z.string().max(500, { message: 'Remarks must not exceed 500 characters.' }).optional(),
  website: z.string().min(2, { message: 'Website must be at least 2 characters.' }),
})

export const vendorSchema = z.object({
  name: z.string().min(2, { message: 'Income source must be at least 2 characters.' }),
  description: z.string().max(500, { message: 'Description must not exceed 500 characters.' }).optional(),
  fileName: z.string().min(2, { message: 'Income source must be at least 2 characters.' }),
  //fileName: z.instanceof(File).optional(),
})

export const authFormSchema = (type:string) =>  z.object({
  //sign-up
  firstName: type === 'sign-in' ? z.string().optional() : z.string()
    .min(3, "firstName must be at least 3 characters long"),
  lastName: type === 'sign-in' ? z.string().optional() : z.string()
  .min(3, "lastName must be at least 3 characters long"),
  address1: type === 'sign-in' ? z.string().optional() : z.string()
  .min(3, "address1 must be at least 3 characters long"),
  state: type === 'sign-in' ? z.string().optional() : z.string()
  .min(3, "state must be at least 3 characters long"),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string()
  .min(3, "postalCode must be at least 3 characters long"),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string()
  .min(3, "dob must be at least 3 characters long"),
  ssn: type === 'sign-in' ? z.string().optional() : z.string()
  .min(3, "ssn must be at least 3 characters long"),
  //sign-in
  // username: z.string()
  //   .min(3, "Username must be at least 3 characters long")
  //   .max(20, "Username must be at most 20 characters long")
  //   .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

export const incomeOptions = [
  { key: "1", label: "KUTIPAN JUMAAT" },
  { key: "2", label: "SUMBANGAN" },
  { key: "3", label: "DERMA" },
  { key: "4", label: "TABUNG AM" },
  { key: "5", label: "TABUNG KEBAJIKAN" },
  { key: "6", label: "KUMPULAN WANG ANAK YATIM" },
  { key: "7", label: "HIBAH" },
  { key: "8", label: "HASIL WAKAF" },
  { key: "9", label: "KUMPULAN WANG KHAIRAT KEMATIAN" },
  { key: "10", label: "SEWA" },
  { key: "11", label: "SUMBANGAN JAIM" },
  { key: "12", label: "TERIMAAN DARIPADA JAIM" },
  { key: "13", label: "TABUNG KECEMASAN MASJID" },
  { key: "14", label: "TAHLIL" },
  { key: "15", label: "PELBAGAI" },
  { key: "16", label: "KUTIPAN TETAP" },
  { key: "17", label: "KUMPULAN WANG PEMBANGUNAN" },
  { key: "18", label: "KUMPULAN WANG ASNAF" },
  { key: "19", label: "TABUNG PENGIMARAHAN" },
  { key: "20", label: "TABUNG PEMBANGUNAN" },
];

export const expensesOptions = [
  { key: "1", label: "AKTIVITI MASJID/SURAU" },
  { key: "2", label: "ALAT TULISAN" },
  { key: "3", label: "BELANJA TABUNG KEBAJIKAN" },
  { key: "4", label: "BELANJA TABUNG PEMBANGUNAN" },
  { key: "5", label: "BELANJA TABUNG PENGIMARAHAN" },
  { key: "6", label: "BIL AIR" },
  { key: "7", label: "BIL ELEKTRIK" },
  { key: "8", label: "BIL TELEFON" },
  { key: "9", label: "CAJ BANK" },
  { key: "10", label: "CAJ BANK CEK ROSAK" },
  { key: "11", label: "DERMA/SUMBANGAN" },
  { key: "12", label: "ELAUN AJK" },
  { key: "13", label: "FOTOSTAT" },
  { key: "14", label: "GAJI" },
  { key: "15", label: "KERAIAN/JAMUAN" },
  { key: "16", label: "KHAIRAT KEMATIAN" },
  { key: "17", label: "PELABURAN" },
  { key: "18", label: "PETROL" },
  { key: "19", label: "QURBAN" },
  { key: "20", label: "REKUPMEN WANG PWR" },
  { key: "21", label: "SAGUHATI" },
  { key: "22", label: "SELENGGARA" },
  { key: "23", label: "SEMINAR/KURSUS LUAR" },
  { key: "24", label: "TAHLIL" },
];

export const customerTypeOptions = [
  { key: "1", label: "Prospect" },
  { key: "2", label: "Customer" },
  { key: "3", label: "Donator" },
];

export const salutationOptions = [
  { key: "1", label: "Mr" },
  { key: "2", label: "Mrs" },
  { key: "3", label: "Encik" },
  { key: "4", label: "Tuan" },
  { key: "5", label: "Cik" },
  { key: "6", label: "Puan" },
  { key: "7", label: "Dato" },
  { key: "8", label: "Datin" },
  { key: "9", label: "Tan Sri" },
  { key: "10", label: "Dato Sri" },
  { key: "11", label: "YB" },
  { key: "12", label: "Tun" },
];

export const paymentMethodOptions = [
  { key: "1", label: "Direct Deposit" },
  { key: "2", label: "Check" },
  { key: "3", label: "Cash" },
  { key: "4", label: "Other" },
  { key: "5", label: "QR" },
];

export const paymentMethodData = [
  { key: "1", label: "Direct Deposit", value: 450, fill: "hsl(var(--chart-1))" },
  { key: "2", label: "Check", value: 200, fill: "hsl(var(--chart-2))" },
  { key: "3", label: "Cash", value: 150, fill: "hsl(var(--chart-3))" },
  { key: "4", label: "Other", value: 100, fill: "hsl(var(--chart-4))" },
];

const BASE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function generateColors(count: number): string[] {
  const colors = [...BASE_COLORS];
  if (count <= BASE_COLORS.length) {
    return colors.slice(0, count);
  }

  // Generate additional colors if needed
  for (let i = BASE_COLORS.length; i < count; i++) {
    const hue = (i * 137.508) % 360; // Use golden angle approximation for distribution
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }

  return colors;
}
