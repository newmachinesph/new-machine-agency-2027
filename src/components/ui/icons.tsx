import type { JSX, ReactNode } from "react";

export type IconProps = {
  size?: number;
  className?: string;
};

export type BrandIcon = (props: IconProps) => JSX.Element;

/**
 * Nomad Media icon set — drawn to the site's design language:
 * square caps + miter joins (no rounding anywhere), 45° chamfers echoing
 * the PatternTrace motif, and small filled squares echoing the mosaic tiles.
 * Drop-in API-compatible with the lucide usage it replaced ({ size, className }).
 */
function Icon({ size = 24, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Website Design — chamfered browser frame, mosaic-tile content block. */
export function IconWebsite(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4 H17 L21 8 V20 H3 Z" />
      <path d="M3 9 H21" />
      <rect x="6" y="12.5" width="4" height="4" fill="currentColor" stroke="none" />
      <path d="M13 13.5 H18 M13 16.5 H16" />
    </Icon>
  );
}

/** Landing Pages — one page, one action: arrow driving into the CTA tile. */
export function IconLanding(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 3 H15 L19 7 V21 H5 Z" />
      <path d="M15 3 V7 H19" />
      <path d="M12 10 V15 M9.5 12.5 L12 15 L14.5 12.5" />
      <rect x="9" y="17" width="6" height="2.5" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Corporate Websites — chamfered tower, mosaic windows. */
export function IconCorporate(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 21 V7 L10 3 H18 V21" />
      <path d="M3 21 H21" />
      <rect x="9.5" y="7.5" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="13.5" y="7.5" width="2" height="2" />
      <rect x="9.5" y="11.5" width="2" height="2" />
      <rect x="13.5" y="11.5" width="2" height="2" fill="currentColor" stroke="none" />
      <path d="M11 21 V17 H15 V21" />
    </Icon>
  );
}

/** Social Media — mosaic tiles chained on the 45° trace diagonal. */
export function IconSocial(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="5" height="5" />
      <path d="M8 8 L9.5 9.5" />
      <rect x="9.5" y="9.5" width="5" height="5" fill="currentColor" stroke="none" />
      <path d="M14.5 14.5 L16 16" />
      <rect x="16" y="16" width="5" height="5" />
    </Icon>
  );
}

/** Lead Generation — 45° funnel, qualified lead drops out as a solid tile. */
export function IconLeads(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4 H21 L15 10 V15 H9 V10 Z" />
      <rect x="10.5" y="17.5" width="3" height="3" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Brand Identity — chamfered mark tile with a solid mosaic core. */
export function IconBrandMark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 3 H15 L21 9 V21 H9 L3 15 Z" />
      <rect x="10" y="10" width="4" height="4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Positioning & Naming — compass body, diamond needle finding true north. */
export function IconCompass(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3 H16 L21 8 V16 L16 21 H8 L3 16 V8 Z" />
      <path d="M12 7 L15.5 12 L12 17 L8.5 12 Z" />
      <rect x="11" y="11" width="2" height="2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Market Research — chamfered lens closing in on a data tile. */
export function IconSearch(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 4 H12 L14 6 V14 H4 Z" />
      <rect x="7" y="7" width="4" height="4" fill="currentColor" stroke="none" />
      <path d="M14 14 L21 21" />
    </Icon>
  );
}

/** Web App / MVP — browser frame around code brackets. */
export function IconAppWindow(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4 H17 L21 8 V20 H3 Z" />
      <path d="M3 9 H21" />
      <path d="M9 12.5 L6.5 15 L9 17.5 M15 12.5 L17.5 15 L15 17.5" />
    </Icon>
  );
}

/** Mobile Apps — chamfered phone body, tile home indicator. */
export function IconMobile(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 2 H15 L17 4 V20 L15 22 H7 L5 20 V4 Z" />
      <path d="M8 6 H16" />
      <rect x="9.5" y="17" width="5" height="2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Performance Ads — concentric targeting squares. */
export function IconTarget(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 3 H21 V21 H3 Z" />
      <path d="M7.5 7.5 H16.5 V16.5 H7.5 Z" />
      <rect x="10.5" y="10.5" width="3" height="3" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** SEO — ascending rank bars, top bar solid with a claimed flag. */
export function IconRank(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 21 V15 H7 V21" />
      <path d="M9 21 V10 H13 V21" />
      <rect x="15" y="5" width="4" height="16" fill="currentColor" stroke="none" />
      <path d="M15 5 H20 V9" />
    </Icon>
  );
}

/** AI Agents & Automation — automated core routed to every corner. */
export function IconAIAgent(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="10" y="10" width="4" height="4" fill="currentColor" stroke="none" />
      <path d="M12 10 V4 M12 14 V20 M10 12 H4 M14 12 H20" />
      <rect x="2.5" y="2.5" width="3" height="3" />
      <rect x="18.5" y="2.5" width="3" height="3" />
      <rect x="2.5" y="18.5" width="3" height="3" />
      <rect x="18.5" y="18.5" width="3" height="3" />
    </Icon>
  );
}

/** Analytics & BI — dashboard frame with a highlighted peak. */
export function IconDashboard(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4 H21 V20 H3 Z" />
      <path d="M7 16 V13 M12 16 V9 M17 16 V9" />
      <rect x="15.5" y="7" width="3" height="3" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Conversion Optimization — split test, variant B winning. */
export function IconSplitTest(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 3 H21 V9 H3 Z" />
      <path d="M12 9 V21" />
      <path d="M5.5 13 H9 M5.5 17 H9" />
      <rect x="15" y="13" width="4" height="4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Fractional CMO / CTO — helm steering from the center. */
export function IconHelm(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 V21 M3 12 H21" />
      <path d="M6.5 6.5 L9.5 9.5 M17.5 6.5 L14.5 9.5 M6.5 17.5 L9.5 14.5 M17.5 17.5 L14.5 14.5" />
      <rect x="10" y="10" width="4" height="4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Fast delivery — angular bolt, straight segments only. */
export function IconSpeed(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 2 L5 13 H10.5 L9 22 L19 10 H13.5 Z" />
    </Icon>
  );
}

/** Transparent pricing — price tag built entirely from 45° edges. */
export function IconPricing(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 10 V3 H10 L21 14 L14 21 Z" />
      <rect x="6" y="6" width="2.5" height="2.5" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Direct communication — chamfered speech tile, square tail, tile dots. */
export function IconChat(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4 H17 L21 8 V17 H9 L5 21 V17 H3 Z" />
      <rect x="8" y="9.5" width="2" height="2" fill="currentColor" stroke="none" />
      <rect x="12.5" y="9.5" width="2" height="2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Results — mosaic tiles stepping up the 45° diagonal into an arrow. */
export function IconGrowth(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="16" width="4" height="4" />
      <rect x="8.5" y="10.5" width="4" height="4" />
      <rect x="14" y="5" width="4" height="4" fill="currentColor" stroke="none" />
      <path d="M18.5 4.5 L21 2 M17 2 H21 V6" />
    </Icon>
  );
}

/** Mail — envelope with chamfered corner. */
export function IconMail(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 5 H18 L21 8 V19 H3 Z" />
      <path d="M3 6 L12 13 L21 6" />
    </Icon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 12.5 L9.5 17.5 L20 7" />
    </Icon>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 12 H19 M14 6.5 L19.5 12 L14 17.5" />
    </Icon>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.5 12 H5 M10 6.5 L4.5 12 L10 17.5" />
    </Icon>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20.5 V5 M6.5 10 L12 4.5 L17.5 10" />
    </Icon>
  );
}
