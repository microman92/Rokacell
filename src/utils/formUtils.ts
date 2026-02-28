import React from 'react';

/**
 * Extracts a numeric value from an HTML input element while aggressively stripping
 * any leading zeros (e.g. "020" -> "20") to prevent UI staleness with React state.
 */
export const getNumberValue = (e: React.ChangeEvent<HTMLInputElement>): number => {
  let val = e.target.value;
  if (/^-?0\d/.test(val)) {
    val = val.replace(/^(-?)0+(?=\d)/, '$1');
    e.target.value = val;
  }
  return +val;
};
