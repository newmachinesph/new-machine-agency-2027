import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="text-8xl font-extrabold tracking-tight">
          4<span className="text-accent-fg">0</span>4
        </p>
        <h1 className="font-display mt-6 text-2xl font-bold tracking-tight">This page wandered off.</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on
          track.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </div>
  );
}
