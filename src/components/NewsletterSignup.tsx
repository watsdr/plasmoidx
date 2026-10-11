/**
 * Calm email signup — plain HTML form POST (no JS, no cookies, no popups).
 * Renders nothing unless NEXT_PUBLIC_NEWSLETTER_ACTION is set at build time.
 * Provider: Buttondown embed-subscribe URL, e.g.
 *   https://buttondown.com/api/emails/embed-subscribe/<username>
 */
const ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;

export default function NewsletterSignup({ className = "" }: { className?: string }) {
  if (!ACTION) return null;
  return (
    <section
      aria-labelledby="newsletter-heading"
      className={`max-w-2xl rounded-xl border border-ink-600/45 px-5 py-6 sm:px-6 ${className}`}
    >
      <h2 id="newsletter-heading" className="text-lg font-medium tracking-tight text-mist-50">
        Get new explainers by email
      </h2>
      <form action={ACTION} method="post" target="_blank" className="mt-4 flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1 basis-60">
          <label htmlFor="newsletter-email" className="block text-sm text-mist-300">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            className="mt-1 min-h-11 w-full rounded-lg border border-ink-600/60 bg-transparent px-3 text-base text-mist-50"
          />
        </div>
        <input type="hidden" name="embed" value="1" />
        <button type="submit" className="btn-primary min-h-11">
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-xs leading-relaxed text-mist-400">
        About one short email when a new explainer or correction goes up. No ads, no
        selling your address. Unsubscribe anytime with the link in every email.
      </p>
    </section>
  );
}
