type JsonLdProps = {
  data: Record<string, unknown>;
};

/** `JSON.stringify` does not escape `<`, so a literal `</script>` anywhere in the
 *  data would close this tag early and turn the rest of the payload into markup.
 *  Escaping the angle bracket keeps it inert and still parses as valid JSON. */
function serialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
