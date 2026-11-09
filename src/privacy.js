/* Spots personal data a visitor types into the AI assistant, so it is never sent, stored or answered.
   The chat is only for questions about Vishal's professional experience.
   Used twice: in the browser before anything is sent, and again in the Cloudflare Worker. */

const KEYWORDS = [
  /\b(my|mein|meine|mon|ma|mi|il mio|la mia)\s+(password|passwort|mot de passe|contraseña|pin|otp)\b/i,
  /\b(password|passwort|pwd|pin|otp)\s*(is|ist|:|=)\s*\S+/i,
  /\b(date of birth|born on|geburtsdatum|geboren am|dob)\b/i,
  /\b(my (home |postal )?address|i live at|meine adresse|ich wohne in)\b/i,
  /\b(passport|reisepass|aadhaar|aadhar|social security|ssn|steuer-?id|tax id)\s*(no\.?|number|nummer|:|is|ist)?\s*[A-Z0-9-]{6,}/i,
];

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}/i;
const IBAN = /\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){3,7}(?:\s?[A-Z0-9]{1,3})?\b/;
const PAN = /\b[A-Z]{5}\d{4}[A-Z]\b/;                    // Indian PAN card
const SSN = /\b\d{3}-\d{2}-\d{4}\b/;
const NUMBER_RUN = /\+?\d[\d\s().\/-]{7,}\d/g;            // phone, card, ID numbers

/* A credit/debit card number passes the Luhn check. */
function luhn(digits) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

function hasPersonalNumber(text) {
  for (const [run] of text.matchAll(NUMBER_RUN)) {
    if (/\b\d{1,2}[./]\d{4}\b/.test(run)) continue;        // "02/2020 - 12/2023" is a date range
    const digits = run.replace(/\D/g, "");
    if (digits.length >= 13 && digits.length <= 19 && luhn(digits)) return true;   // card
    if (digits.length >= 9 && digits.length <= 15) return true;                    // phone, Aadhaar, IDs
  }
  return false;
}

/* True when the text looks like it contains personal data. */
export function containsPersonalData(text) {
  if (typeof text !== "string" || !text) return false;
  return EMAIL.test(text) || IBAN.test(text) || PAN.test(text) || SSN.test(text)
    || hasPersonalNumber(text) || KEYWORDS.some((re) => re.test(text));
}

export const PRIVACY_WARNING =
  "Please don't share personal details in this chat. It is only for questions about Vishal's professional experience.";
