// ─── Supported currencies ────────────────────────────────────────────────────
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$',    name: 'US Dollar',            locale: 'en-US' },
  { code: 'EUR', symbol: '€',    name: 'Euro',                 locale: 'de-DE' },
  { code: 'GBP', symbol: '£',    name: 'British Pound',        locale: 'en-GB' },
  { code: 'NGN', symbol: '₦',    name: 'Nigerian Naira',       locale: 'en-NG' },
  { code: 'GHS', symbol: 'GH₵',  name: 'Ghanaian Cedi',        locale: 'en-GH' },
  { code: 'KES', symbol: 'KSh',  name: 'Kenyan Shilling',      locale: 'sw-KE' },
  { code: 'ZAR', symbol: 'R',    name: 'South African Rand',   locale: 'en-ZA' },
  { code: 'CAD', symbol: 'CA$',  name: 'Canadian Dollar',      locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$',   name: 'Australian Dollar',    locale: 'en-AU' },
  { code: 'INR', symbol: '₹',    name: 'Indian Rupee',         locale: 'en-IN' },
  { code: 'XOF', symbol: 'CFA',  name: 'West African CFA Franc', locale: 'fr-SN' },
  { code: 'EGP', symbol: 'E£',   name: 'Egyptian Pound',       locale: 'ar-EG' },
  { code: 'TZS', symbol: 'TSh',  name: 'Tanzanian Shilling',   locale: 'sw-TZ' },
  { code: 'UGX', symbol: 'USh',  name: 'Ugandan Shilling',     locale: 'en-UG' },
];

const STORAGE_KEY = 'nexwork_currency';

// ─── Persistence ─────────────────────────────────────────────────────────────
export const getCurrencyCode = (): string =>
  localStorage.getItem(STORAGE_KEY) ?? 'USD';

export const saveCurrencyCode = (code: string): void =>
  localStorage.setItem(STORAGE_KEY, code);

export const getCurrency = (code?: string): Currency =>
  CURRENCIES.find((c) => c.code === (code ?? getCurrencyCode())) ?? CURRENCIES[0];

// ─── Formatting ───────────────────────────────────────────────────────────────
export const formatAmount = (value: number, code?: string): string => {
  const cur = getCurrency(code);
  try {
    return new Intl.NumberFormat(cur.locale, {
      style: 'currency',
      currency: cur.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    // Fallback for locales/currencies not fully supported
    return `${cur.symbol}${value.toLocaleString()}`;
  }
};

/**
 * Parses a legacy "$1,200.00" string, strips the old symbol, and reformats
 * using the currently selected currency.
 */
export const reformatAmount = (str: string, code?: string): string => {
  const num = parseFloat(str.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return str;
  return formatAmount(num, code);
};
