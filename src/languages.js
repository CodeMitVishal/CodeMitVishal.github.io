/* Every language the site offers.
   - `hand: true`  -> translated by hand, stored in src/i18n/<code>.js, switches instantly on this site.
   - `google`      -> no hand translation; opens Google's machine translation of the site (clearly labelled).
   Names are endonyms (the language's own name) with the English name as a hint, as language-selector guidance recommends. */

export const SITE_HOST = "codemitvishal.github.io";

export const LANGUAGE_GROUPS = [
  {
    id: "europe",
    label: "Europe",
    more: "More European languages",
    languages: [
      { code: "en", name: "English", english: "English", hand: true },
      { code: "de", name: "Deutsch", english: "German", hand: true },
      { code: "fr", name: "Français", english: "French", hand: true },
      { code: "es", name: "Español", english: "Spanish", hand: true },
      { code: "it", name: "Italiano", english: "Italian", hand: true },
      { code: "pt", name: "Português", english: "Portuguese", google: "pt" },
      { code: "nl", name: "Nederlands", english: "Dutch", google: "nl" },
      { code: "pl", name: "Polski", english: "Polish", google: "pl" },
      { code: "ro", name: "Română", english: "Romanian", google: "ro" },
      { code: "el", name: "Ελληνικά", english: "Greek", google: "el" },
      { code: "sv", name: "Svenska", english: "Swedish", google: "sv" },
      { code: "cs", name: "Čeština", english: "Czech", google: "cs" },
      { code: "hu", name: "Magyar", english: "Hungarian", google: "hu" },
      { code: "da", name: "Dansk", english: "Danish", google: "da" },
      { code: "fi", name: "Suomi", english: "Finnish", google: "fi" },
      { code: "no", name: "Norsk", english: "Norwegian", google: "no" },
      { code: "sk", name: "Slovenčina", english: "Slovak", google: "sk" },
      { code: "bg", name: "Български", english: "Bulgarian", google: "bg" },
      { code: "hr", name: "Hrvatski", english: "Croatian", google: "hr" },
      { code: "sr", name: "Српски", english: "Serbian", google: "sr" },
      { code: "sl", name: "Slovenščina", english: "Slovenian", google: "sl" },
      { code: "lt", name: "Lietuvių", english: "Lithuanian", google: "lt" },
      { code: "lv", name: "Latviešu", english: "Latvian", google: "lv" },
      { code: "et", name: "Eesti", english: "Estonian", google: "et" },
      { code: "uk", name: "Українська", english: "Ukrainian", google: "uk" },
      { code: "tr", name: "Türkçe", english: "Turkish", google: "tr" },
      { code: "ca", name: "Català", english: "Catalan", google: "ca" },
      { code: "ga", name: "Gaeilge", english: "Irish", google: "ga" },
      { code: "mt", name: "Malti", english: "Maltese", google: "mt" },
      { code: "sq", name: "Shqip", english: "Albanian", google: "sq" },
      { code: "mk", name: "Македонски", english: "Macedonian", google: "mk" },
      { code: "bs", name: "Bosanski", english: "Bosnian", google: "bs" },
      { code: "is", name: "Íslenska", english: "Icelandic", google: "is" },
      { code: "lb", name: "Lëtzebuergesch", english: "Luxembourgish", google: "lb" },
      { code: "eu", name: "Euskara", english: "Basque", google: "eu" },
      { code: "gl", name: "Galego", english: "Galician", google: "gl" },
      { code: "cy", name: "Cymraeg", english: "Welsh", google: "cy" },
    ],
  },
  {
    id: "india",
    label: "India",
    more: "More Indian languages",
    languages: [
      { code: "hi", name: "हिन्दी", english: "Hindi", hand: true },
      { code: "kn", name: "ಕನ್ನಡ", english: "Kannada", hand: true },
      { code: "bn", name: "বাংলা", english: "Bengali", hand: true },
      { code: "mr", name: "मराठी", english: "Marathi", hand: true },
      { code: "te", name: "తెలుగు", english: "Telugu", hand: true },
      { code: "ta", name: "தமிழ்", english: "Tamil", hand: true },
      { code: "gu", name: "ગુજરાતી", english: "Gujarati", hand: true },
      { code: "ur", name: "اردو", english: "Urdu", google: "ur", rtl: true },
      { code: "or", name: "ଓଡ଼ିଆ", english: "Odia", google: "or" },
      { code: "ml", name: "മലയാളം", english: "Malayalam", google: "ml" },
      { code: "pa", name: "ਪੰਜਾਬੀ", english: "Punjabi", google: "pa" },
      { code: "as", name: "অসমীয়া", english: "Assamese", google: "as" },
      { code: "mai", name: "मैथिली", english: "Maithili", google: "mai" },
      { code: "sa", name: "संस्कृतम्", english: "Sanskrit", google: "sa" },
      { code: "gom", name: "कोंकणी", english: "Konkani", google: "gom" },
      { code: "ne", name: "नेपाली", english: "Nepali", google: "ne" },
      { code: "sd", name: "سنڌي", english: "Sindhi", google: "sd", rtl: true },
      { code: "doi", name: "डोगरी", english: "Dogri", google: "doi" },
      { code: "mni", name: "ꯃꯤꯇꯩꯂꯣꯟ", english: "Meitei (Manipuri)", google: "mni-Mtei" },
      { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ", english: "Santali", google: "sat" },
      { code: "bho", name: "भोजपुरी", english: "Bhojpuri", google: "bho" },
    ],
  },
];

export const ALL_LANGUAGES = LANGUAGE_GROUPS.flatMap((g) => g.languages);
export const HAND_LANGUAGES = ALL_LANGUAGES.filter((l) => l.hand);

/* Google's proxy address for a machine translation of this site. */
export function googleTranslateUrl(googleCode) {
  const host = SITE_HOST.replace(/\./g, "-");
  return `https://${host}.translate.goog/?_x_tr_sl=en&_x_tr_tl=${encodeURIComponent(googleCode)}&_x_tr_hl=${encodeURIComponent(googleCode)}&_x_tr_pto=wapp`;
}

export const isGoogleProxy = () => typeof window !== "undefined" && window.location.hostname.endsWith(".translate.goog");
