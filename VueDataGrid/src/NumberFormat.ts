//based on code from accounting.js
/*!
 * accounting.js v0.4.2
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */

function unformat(value: any, decimal: string) {
   // Fails silently (need decent errors):
   if(!value)
      return 0;

   // Return the value as-is if it's already a number:
   if (typeof value === "number") return value;

    // Build regex to strip out everything except digits, decimal point and minus sign:
   const regex = new RegExp("[^0-9-.]", "g");
   const result = parseFloat(
      ("" + value)
      .replace(/\((?=\d+)(.*)\)/, "-$1") // replace bracketed values with negatives
      .replace(decimal, '.')      // make sure decimal point is standard
      .replace(regex, '')         // strip out any cruft
   );

   // This will fail silently which may cause trouble, let's wait and see:
   return !isNaN(result) ? result : 0;
}

/**
 * Check and normalise the value of precision (must be positive integer)
 */
function checkPrecision(val: number, base: number) {
   val = Math.round(Math.abs(val));
   return isNaN(val)? base : val;
}

/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */
function toFixed(value: number, precision: number) {
   precision = checkPrecision(precision, 2);

   const exponentialForm = Number(value + 'e' + precision);
   const rounded = Math.round(exponentialForm);
   return Number(rounded + 'e-' + precision).toFixed(precision);
}

export function formatNumber(value: any, precision: number, thousand: string, decimal: string) {
   const raw = unformat(value, decimal);

   // Clean up precision
   const usePrecision = checkPrecision(precision, 2);

   // Do some calc:
   const negative = raw < 0 ? "-" : "";
   const base = parseInt(toFixed(Math.abs(raw || 0), usePrecision), 10) + "";
   const mod = base.length > 3 ? base.length % 3 : 0;

   // Format the number:
   return negative +
      (mod ? base.substr(0, mod) + thousand : "") +
      base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
      (usePrecision ? decimal + toFixed(Math.abs(raw), usePrecision).split('.')[1] : "");
}
