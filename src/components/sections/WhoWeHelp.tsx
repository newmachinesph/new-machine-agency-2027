import { IconCheck } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const groups = [
  {
    chip: "For SMEs",
    tint: "#8fc57f",
    title: "Small & medium businesses",
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
          number="03"
          eyebrow="Who we help"
          title="Built around your industry, not a generic checklist."
          lead="Different industries win customers in different ways. We shape every engagement around how yours actually works."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <div className="panel h-full p-7">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: group.tint }}
                >
                  {group.chip}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{group.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-muted">
                      <IconCheck size={15} className="shrink-0 text-accent-fg" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-center text-sm text-muted">
            Based in the UAE · serving businesses globally — professional digital growth
            without the traditional agency price tag.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
