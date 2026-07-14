import { site } from "@/config/site";
import DuotoneImage from "@/components/ui/DuotoneImage";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoPlayer from "@/components/ui/VideoPlayer";

/** Representative sample reels. Only two brand films exist so far, so they
 *  stand in across the three slots (same honesty policy as site.ts
 *  testimonials). Swap for real, client-consented footage as it's filmed. */
const videoSrcs = [
  "/video/founder-on-video-call.mp4",
  "/video/founder-on-video-call.mp4",
  "/video/team-in-studio.mp4",
] as const;

export default function Testimonials() {
  return (
    <section className="bg-surface py-16 md:py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Client words"
          title="Don’t take our word for it."
          lead="Representative sample conversations, on and off camera: real quotes, real process, standing in until client-consented case studies replace them."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {site.testimonials.map((testimonial, i) => (
            /* ponytail: md:mt-12 instead of translate-y. Motion sets inline
               transform on Reveal, which would override a translate utility. */
            <Reveal key={testimonial.name} delay={i * 120} className={i === 1 ? "md:mt-12" : ""}>
              <div className="panel beam chamfer relative flex h-full flex-col overflow-hidden">
                <VideoPlayer
                  src={videoSrcs[i]}
                  title={`${testimonial.name}: representative client conversation`}
                />
                <div className="relative flex flex-1 flex-col p-8">
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-1 font-display text-7xl text-accent-fg opacity-40"
                  >
                    “
                  </span>
                  <Logo className="absolute right-8 top-8 h-5 w-auto" />
                  <p className="relative mt-10 text-lg font-medium leading-relaxed md:text-xl">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <DuotoneImage
                      src={`https://i.pravatar.cc/96?u=${encodeURIComponent(testimonial.name)}`}
                      className="h-10 w-10 shrink-0"
                      sizes="40px"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bonus reel: third representative video, wide-canvas bento treatment */}
        <Reveal delay={260} className="mt-6">
          <div className="panel beam chamfer relative overflow-hidden md:flex md:items-stretch">
            <VideoPlayer
              src={videoSrcs[2]}
              title="Inside New Machine: representative studio walkthrough"
              className="md:w-1/2"
            />
            <div className="flex flex-col justify-center p-8 md:w-1/2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
                Representative sample
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                More client conversations, on camera.
              </h3>
              <p className="mt-2 text-muted">
                A taste of how a kickoff call actually feels. We’ll swap this reel
                for real client footage as soon as we’ve filmed one together.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
