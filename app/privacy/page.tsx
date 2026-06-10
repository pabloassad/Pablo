import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for pablito.world",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 sm:px-8 sm:py-40">
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Privacy Policy</h1>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-muted sm:text-base">
        <p>
          This website does not use tracking cookies or third-party analytics. Information submitted through the
          contact form is used solely to respond to your inquiry and is never shared with third parties.
        </p>
        <p>
          Embedded content from platforms such as Spotify, SoundCloud and YouTube may be subject to those
          platforms&apos; own privacy policies when interacted with.
        </p>
        <p>For any questions regarding this policy, please reach out via the contact page.</p>
      </div>
    </section>
  );
}
