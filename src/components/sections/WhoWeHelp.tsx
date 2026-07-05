import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DuotoneImage from "@/components/ui/DuotoneImage";
import PatternGrid from "@/components/ui/PatternGrid";

const groups = [
  {
    chip: "For SMEs",
    tint: "#8fc57f",
    title: "Small & medium businesses",
    line: "Most small-business sites are built once and abandoned — yours should compound every month it stays live.",
    seed: "nomad-sme-studio",
    points: [
      "Professional websites",
      "Branding",
      "Online presence",
      "Lead generation",
      "Social media",
    ],
  },
  {
    chip: "For Clinics",
    tint: "#67ad62",
    title: "Clinics & healthcare",
    line: "Patients decide before they call. A booking flow with friction just sends them to the clinic that doesn't have one.",
    seed: "nomad-clinic-care",
    points: [
      "Patient acquisition",
      "Appointment bookings",
      "Local SEO",
      "Paid ads",
      "Trust-building",
    ],
  },
  {
    chip: "For Real Estate",
    tint: "#35753a",
    title: "Real estate & developers",
    line: "Developments sell on renderings and urgency — your funnel has to move as fast as the market does.",
    seed: "nomad-realestate-dev",
    points: [
      "Project landing pages",
      "Lead generation",
      "Marketing funnels",
      "Branding",
      "Digital campaigns",
    ],
  },
];

export default function WhoWeHelp() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <SectionHeading
          number="04"
          eyebrow="Who we help"
          title="Built for how each industry actually wins."
          lead="Different industries win customers in different ways. We shape every engagement around how yours actually works — not a generic checklist."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <div className="beam panel chamfer relative flex h-full flex-col overflow-hidden">
                <DuotoneImage
                  src={`https://picsum.photos/seed/${group.seed}/640/480`}
                  className="h-44"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <PatternGrid
                  cols={2}
                  rows={2}
                  className="pointer-events-none absolute right-0 top-0 h-16 w-16 opacity-20 [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]"
                />

                <div className="flex flex-1 flex-col p-7">
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.15em]"
                    style={{ color: group.tint }}
                  >
                    {group.chip}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold">{group.title}</h3>
                  <p className="mt-3 text-sm text-muted">{group.line}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.points.map((point) => (
                      <li
                        key={point}
                        className="border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-fg/70"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-center text-sm text-muted">
            Based in the UAE · serving businesses globally — full-lifecycle digital growth
            without the traditional agency price tag.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
