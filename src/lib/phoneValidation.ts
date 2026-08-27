export interface CountryCodeItem {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  placeholder: string;
  minDigits: number;
  maxDigits: number;
}

export const COUNTRY_CODES: CountryCodeItem[] = [
  // GCC & Middle East Priority
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "+971",
    flag: "🇦🇪",
    placeholder: "50 123 4567",
    minDigits: 8,
    maxDigits: 9,
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "+966",
    flag: "🇸🇦",
    placeholder: "50 123 4567",
    minDigits: 8,
    maxDigits: 9,
  },
  {
    name: "Qatar",
    code: "QA",
    dialCode: "+974",
    flag: "🇶🇦",
    placeholder: "3312 3456",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    name: "Kuwait",
    code: "KW",
    dialCode: "+965",
    flag: "🇰🇼",
    placeholder: "5123 4567",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    name: "Oman",
    code: "OM",
    dialCode: "+968",
    flag: "🇴🇲",
    placeholder: "9123 4567",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    name: "Bahrain",
    code: "BH",
    dialCode: "+973",
    flag: "🇧🇭",
    placeholder: "3612 3456",
    minDigits: 8,
    maxDigits: 8,
  },

  // Popular & Global
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "🇺🇸",
    placeholder: "555 123 4567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "🇬🇧",
    placeholder: "7911 123456",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: "🇮🇳",
    placeholder: "98765 43210",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Canada",
    code: "CA",
    dialCode: "+1",
    flag: "🇨🇦",
    placeholder: "416 555 0123",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: "🇦🇺",
    placeholder: "412 345 678",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Germany",
    code: "DE",
    dialCode: "+49",
    flag: "🇩🇪",
    placeholder: "151 1234 5678",
    minDigits: 9,
    maxDigits: 11,
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "🇫🇷",
    placeholder: "6 12 34 56 78",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Italy",
    code: "IT",
    dialCode: "+39",
    flag: "🇮🇹",
    placeholder: "312 345 6789",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    name: "Spain",
    code: "ES",
    dialCode: "+34",
    flag: "🇪🇸",
    placeholder: "612 34 56 78",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Switzerland",
    code: "CH",
    dialCode: "+41",
    flag: "🇨🇭",
    placeholder: "79 123 45 67",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Netherlands",
    code: "NL",
    dialCode: "+31",
    flag: "🇳🇱",
    placeholder: "6 1234 5678",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Singapore",
    code: "SG",
    dialCode: "+65",
    flag: "🇸🇬",
    placeholder: "8123 4567",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    name: "China",
    code: "CN",
    dialCode: "+86",
    flag: "🇨🇳",
    placeholder: "138 0013 8000",
    minDigits: 11,
    maxDigits: 11,
  },
  {
    name: "Japan",
    code: "JP",
    dialCode: "+81",
    flag: "🇯🇵",
    placeholder: "90 1234 5678",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    name: "South Korea",
    code: "KR",
    dialCode: "+82",
    flag: "🇰🇷",
    placeholder: "10 1234 5678",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    name: "Pakistan",
    code: "PK",
    dialCode: "+92",
    flag: "🇵🇰",
    placeholder: "300 1234567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Bangladesh",
    code: "BD",
    dialCode: "+880",
    flag: "🇧🇩",
    placeholder: "1712 345678",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Egypt",
    code: "EG",
    dialCode: "+20",
    flag: "🇪🇬",
    placeholder: "10 1234 5678",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Jordan",
    code: "JO",
    dialCode: "+962",
    flag: "🇯🇴",
    placeholder: "7 9012 3456",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Lebanon",
    code: "LB",
    dialCode: "+961",
    flag: "🇱🇧",
    placeholder: "70 123456",
    minDigits: 7,
    maxDigits: 8,
  },
  {
    name: "Iraq",
    code: "IQ",
    dialCode: "+964",
    flag: "🇮🇶",
    placeholder: "790 123 4567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Turkey",
    code: "TR",
    dialCode: "+90",
    flag: "🇹🇷",
    placeholder: "532 123 4567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "South Africa",
    code: "ZA",
    dialCode: "+27",
    flag: "🇿🇦",
    placeholder: "71 123 4567",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    flag: "🇳🇬",
    placeholder: "803 123 4567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Kenya",
    code: "KE",
    dialCode: "+254",
    flag: "🇰🇪",
    placeholder: "712 345678",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Malaysia",
    code: "MY",
    dialCode: "+60",
    flag: "🇲🇾",
    placeholder: "12 345 6789",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    name: "Indonesia",
    code: "ID",
    dialCode: "+62",
    flag: "🇮🇩",
    placeholder: "812 3456 7890",
    minDigits: 9,
    maxDigits: 12,
  },
  {
    name: "Philippines",
    code: "PH",
    dialCode: "+63",
    flag: "🇵🇭",
    placeholder: "917 123 4567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Thailand",
    code: "TH",
    dialCode: "+66",
    flag: "🇹🇭",
    placeholder: "81 234 5678",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Sri Lanka",
    code: "LK",
    dialCode: "+94",
    flag: "🇱🇰",
    placeholder: "71 234 5678",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Nepal",
    code: "NP",
    dialCode: "+977",
    flag: "🇳🇵",
    placeholder: "984 1234567",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "New Zealand",
    code: "NZ",
    dialCode: "+64",
    flag: "🇳🇿",
    placeholder: "21 123 4567",
    minDigits: 8,
    maxDigits: 10,
  },
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: "🇧🇷",
    placeholder: "11 98765 4321",
    minDigits: 10,
    maxDigits: 11,
  },
  {
    name: "Mexico",
    code: "MX",
    dialCode: "+52",
    flag: "🇲🇽",
    placeholder: "55 1234 5678",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Russia",
    code: "RU",
    dialCode: "+7",
    flag: "🇷🇺",
    placeholder: "912 345 6789",
    minDigits: 10,
    maxDigits: 10,
  },
  {
    name: "Belgium",
    code: "BE",
    dialCode: "+32",
    flag: "🇧🇪",
    placeholder: "470 12 34 56",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Austria",
    code: "AT",
    dialCode: "+43",
    flag: "🇦🇹",
    placeholder: "664 123 4567",
    minDigits: 9,
    maxDigits: 11,
  },
  {
    name: "Sweden",
    code: "SE",
    dialCode: "+46",
    flag: "🇸🇪",
    placeholder: "70 123 45 67",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Norway",
    code: "NO",
    dialCode: "+47",
    flag: "🇳🇴",
    placeholder: "412 34 567",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    name: "Denmark",
    code: "DK",
    dialCode: "+45",
    flag: "🇩🇰",
    placeholder: "20 12 34 56",
    minDigits: 8,
    maxDigits: 8,
  },
  {
    name: "Finland",
    code: "FI",
    dialCode: "+358",
    flag: "🇫🇮",
    placeholder: "40 123 4567",
    minDigits: 9,
    maxDigits: 10,
  },
  {
    name: "Ireland",
    code: "IE",
    dialCode: "+353",
    flag: "🇮🇪",
    placeholder: "83 123 4567",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Portugal",
    code: "PT",
    dialCode: "+351",
    flag: "🇵🇹",
    placeholder: "912 345 678",
    minDigits: 9,
    maxDigits: 9,
  },
  {
    name: "Greece",
    code: "GR",
    dialCode: "+30",
    flag: "🇬🇷",
    placeholder: "691 234 5678",
    minDigits: 10,
    maxDigits: 10,
  },
];

export const DEFAULT_COUNTRY: CountryCodeItem = COUNTRY_CODES[0] as CountryCodeItem; // UAE (+971)

export function findCountry(query?: string): CountryCodeItem {
  if (!query) return DEFAULT_COUNTRY;
  const q = query.trim().toUpperCase();
  // Match exact code (e.g. "US", "AE")
  const byCode = COUNTRY_CODES.find((c) => c.code.toUpperCase() === q);
  if (byCode) return byCode;

  // Match exact dialCode (e.g. "+971", "+1")
  const byDialCode = COUNTRY_CODES.find((c) => c.dialCode === query.trim());
  if (byDialCode) return byDialCode;

  return DEFAULT_COUNTRY;
}

export function findCountryByDialCode(dialCode?: string): CountryCodeItem {
  if (!dialCode) return DEFAULT_COUNTRY;
  return findCountry(dialCode);
}

/**
 * Extracts and sanitizes clean national phone digits from user input.
 * Strips leading dial codes if pasted (e.g. +971, +1, 00971) and leading trunk 0.
 */
export function extractCleanDigits(phone: string, countryDialCode: string = DEFAULT_COUNTRY.dialCode): string {
  let cleaned = phone.trim();
  if (!cleaned) return "";

  // If user pasted or typed with leading '+', remove the country dial code if present
  const dialDigits = countryDialCode.replace(/\D/g, "");
  const withPlus = `+${dialDigits}`;
  const with00 = `00${dialDigits}`;

  if (cleaned.startsWith(withPlus)) {
    cleaned = cleaned.substring(withPlus.length).trim();
  } else if (cleaned.startsWith(with00)) {
    cleaned = cleaned.substring(with00.length).trim();
  } else if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1).trim();
  }

  // Remove separators: spaces, dashes, dots, parentheses
  let digitsOnly = cleaned.replace(/[\s\-\(\)\.]/g, "");

  const country = findCountryByDialCode(countryDialCode);

  // US/Canada: if user included leading '1' prefix (11 digits), strip it
  if ((country.code === "US" || country.code === "CA") && digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
    digitsOnly = digitsOnly.substring(1);
  }

  // If user entered leading trunk '0' (e.g. 050 123 4567 in UAE or 07911 in UK)
  if (digitsOnly.startsWith("0") && digitsOnly.length > country.minDigits) {
    digitsOnly = digitsOnly.substring(1);
  }

  return digitsOnly;
}

/**
 * Validates a phone number based on the selected country code.
 */
export function validatePhoneNumber(
  phone: string,
  countryDialCode: string = DEFAULT_COUNTRY.dialCode
): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) {
    return "Phone number is required";
  }

  // Check if string contains any invalid non-digit characters (other than standard formatting symbols)
  const allowedCharsRegex = /^[\d\s\-\(\)\.\+]+$/;
  if (!allowedCharsRegex.test(trimmed)) {
    return "Phone number must contain only numbers";
  }

  const digits = extractCleanDigits(trimmed, countryDialCode);
  if (!digits || !/^\d+$/.test(digits)) {
    return "Phone number is required";
  }

  const country = findCountryByDialCode(countryDialCode);
  const len = digits.length;

  if (country.minDigits === country.maxDigits) {
    if (len !== country.minDigits) {
      return `Please enter a valid ${country.minDigits}-digit phone number`;
    }
  } else {
    if (len < country.minDigits || len > country.maxDigits) {
      return `Please enter a valid ${country.minDigits}–${country.maxDigits} digit phone number`;
    }
  }

  return undefined;
}

/**
 * Combines country code and phone number into a standard international format.
 */
export function formatFullPhoneNumber(
  countryDialCode: string,
  phone: string
): string {
  const digits = extractCleanDigits(phone, countryDialCode);
  if (!digits) return "";
  return `${countryDialCode} ${digits}`;
}
