import { ValueTransformer } from 'typeorm';

/**
 * MySQL BIGINT columns come back from mysql2 as strings to preserve
 * precision. Existing service code treats id-like fields as numbers,
 * so we coerce on read. Writes pass through.
 */
export const bigintTransformer: ValueTransformer = {
  to: (value: number | null | undefined): number | null | undefined => value,
  from: (value: string | null | undefined): number | null | undefined => {
    if (value === null) return null;
    if (value === undefined) return undefined;
    return Number(value);
  },
};
