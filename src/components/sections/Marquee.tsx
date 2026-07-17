import services from "@/content/services.json";
import AccentTick from "@/components/ui/AccentTick";

const items = [...services.map((s) => s.name), "Remote-first · Worldwide", "Est. 2026"];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex w-max items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 pr-6 text-xs uppercase tracking-[0.2em] text-muted"
        >
          {item}
          <AccentTick className="h-2 w-2" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-border py-3">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
