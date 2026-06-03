import { useState, useCallback } from 'react';
import {
  CURRENCIES,
  getCurrencyCode,
  saveCurrencyCode,
  getCurrency,
  formatAmount,
  reformatAmount,
  type Currency,
} from '@/lib/currency';

export interface UseCurrencyReturn {
  code: string;
  currency: Currency;
  symbol: string;
  currencies: Currency[];
  format: (value: number) => string;
  reformat: (str: string) => string;
  setCurrency: (code: string) => void;
}

export const useCurrency = (): UseCurrencyReturn => {
  const [code, setCode] = useState<string>(getCurrencyCode);

  const setCurrency = useCallback((newCode: string) => {
    saveCurrencyCode(newCode);
    setCode(newCode);
  }, []);

  const currency = getCurrency(code);

  const format = useCallback(
    (value: number) => formatAmount(value, code),
    [code]
  );

  const reformat = useCallback(
    (str: string) => reformatAmount(str, code),
    [code]
  );

  return {
    code,
    currency,
    symbol: currency.symbol,
    currencies: CURRENCIES,
    format,
    reformat,
    setCurrency,
  };
};
