export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-20">
      <h1 className="font-display text-4xl text-lagoon mb-6">About East Sri Lanka Tourism</h1>
      <p className="text-ink/70 leading-relaxed mb-4">
        We're a directory and booking platform for the eastern coast of Sri Lanka — Trincomalee,
        Batticaloa and Ampara — connecting travellers directly with vetted local hotels,
        restaurants, activity operators and tour guides.
      </p>
      <p className="text-ink/70 leading-relaxed">
        {/* TODO: replace with real company copy */}
        Every business on this platform goes through admin review before it's listed publicly.
      </p>
    </div>
  );
}
