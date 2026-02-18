export default function UnpackFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-6">
          <a
            href="https://scrolly.to"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-lg tracking-tight text-text-primary transition-colors hover:text-forward-blue"
          >
            scrolly.to
          </a>
          <span className="text-border">/</span>
          <a
            href="https://seed.bytedance.com/en/seed2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          >
            Seed2.0 Official
          </a>
        </div>

        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span>Data from Seed2.0 technical report</span>
          <span className="text-border">&middot;</span>
          <span>&copy; {new Date().getFullYear()} scrolly.to</span>
        </div>
      </div>
    </footer>
  );
}
