/* Official brand marks for the services this site links to.
   - GitHub, YouTube and Gmail: the official logos from Simple Icons (CC0, simple-icons npm package).
   - LinkedIn and Microsoft are no longer in Simple Icons (removed at the companies' request), so their
     official marks are drawn here: LinkedIn's "in" bug in LinkedIn blue, Microsoft's four squares.
   Colours follow each brand's guidelines; GitHub's mark uses the text colour, so it works in light
   and dark mode. Icons are decorative (aria-hidden): the link text always says where it goes. */
import { siGithub, siGmail, siYoutube } from "simple-icons";

const LINKEDIN =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const MARKS = {
  github: <path d={siGithub.path} fill="currentColor" />,
  youtube: (<>
    <path d="M9 7.5h7v9H9z" fill="#fff" />
    <path d={siYoutube.path} fill={`#${siYoutube.hex}`} />
  </>),
  linkedin: (<>
    <rect x="2" y="2" width="20" height="20" fill="#fff" />
    <path d={LINKEDIN} fill="#0A66C2" />
  </>),
  gmail: <path d={siGmail.path} fill={`#${siGmail.hex}`} />,
  microsoft: (<>
    <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
    <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
    <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
  </>),
};

/* Which brand a link belongs to, from its address. */
export function brandOf(url = "") {
  if (/^mailto:.*@gmail\.com/i.test(url)) return "gmail";
  if (/\/\/(www\.)?github\.com\//i.test(url)) return "github";
  if (/\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url)) return "youtube";
  if (/\/\/([a-z]+\.)?linkedin\.com\//i.test(url)) return "linkedin";
  if (/\/\/learn\.microsoft\.com\//i.test(url)) return "microsoft";
  return null;
}

export default function BrandIcon({ name, url }) {
  const brand = name || brandOf(url);
  if (!brand || !MARKS[brand]) return null;
  return (
    <svg className={`brand brand-${brand}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{MARKS[brand]}</svg>
  );
}
