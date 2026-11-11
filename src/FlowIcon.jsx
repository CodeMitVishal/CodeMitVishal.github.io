/* Icons for the steps in the case-study flow diagrams.
   - Azure services: Microsoft's official Azure Architecture Icons (public/icons/azure/, unmodified,
     used under Microsoft's icon terms for architecture diagrams; the product name sits next to each).
   - .NET and Angular: official logos from Simple Icons (CC0).
   - Steps that are not one product (devices data stream, database, user...): Lucide line icons (ISC).
   Keyed by the English step name in data.js; a step without an entry simply shows no icon. */
import {
  Activity, Bot, Boxes, Cpu, Database, GitCommitHorizontal, Plug, ScrollText, Send, ShieldCheck, User,
} from "lucide-react";
import { siAngular, siDotnet } from "simple-icons";

const BASE = import.meta.env?.BASE_URL ?? "/";
const azure = (file) => ({ type: "img", src: `${BASE}icons/azure/${file}` });
const brand = (icon) => ({ type: "brand", icon });
const line = (Component) => ({ type: "line", Component });

const ICONS = {
  // Cloud Device Management Platform
  "Devices": azure("devices.svg"),
  "IoT Hub": azure("iot-hub.svg"),
  "Consumer groups": line(Activity),
  "Data processors": line(Cpu),
  "Database": line(Database),
  ".NET API": brand(siDotnet),
  "Angular UI": brand(siAngular),
  "A change": line(GitCommitHorizontal),
  ".NET service": brand(siDotnet),
  "Outbox relay": line(Send),
  "Service Bus": azure("service-bus.svg"),
  "Other services": line(Boxes),
  // AI agents
  "App / user": line(User),
  "Agent": line(Bot),
  "Tool APIs": line(Plug),
  "RAG": azure("ai-search.svg"),
  "Model": azure("ai-foundry.svg"),
  // Global insurance sales platform
  "Angular": brand(siAngular),
  ".NET Core API": brand(siDotnet),
  "Consent": line(ShieldCheck),
  "Key Vault": azure("key-vault.svg"),
  "Audit log": line(ScrollText),
  "Azure": azure("azure-devops.svg"),
};

/* Very dark brand colours (Angular's is near-black) would vanish in dark mode: use the text colour. */
const dark = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 40;
};

export default function FlowIcon({ step }) {
  const icon = ICONS[step];
  if (!icon) return null;
  // Tiny files (under 3 KB): load them straight away so icons never pop in late.
  if (icon.type === "img") return <img className="flow-icon" src={icon.src} alt="" width="28" height="28" decoding="async" />;
  if (icon.type === "brand") {
    return (
      <svg className={`flow-icon flow-icon-${icon.icon.slug}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={icon.icon.path} fill={dark(icon.icon.hex) ? "currentColor" : `#${icon.icon.hex}`} />
      </svg>
    );
  }
  const { Component } = icon;
  return <Component className="flow-icon flow-icon-line" aria-hidden="true" strokeWidth={1.6} />;
}
