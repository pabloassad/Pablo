"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ArtImage } from "@/components/ui/ArtImage";
import { Emph } from "@/components/ui/Emph";
import { images, profileVideoUrl } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProfileSection() {
  const { t } = useLanguage();

  return (
    <section id="profile" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo — left column on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          {profileVideoUrl ? (
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <video
                src={profileVideoUrl}
                poster={images.portraitBeige}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover [filter:contrast(1.08)_saturate(0.88)_brightness(0.97)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
          ) : (
            <ArtImage
              src={images.portraitBeige}
              alt="Pablito · portrait"
              fallback="amber"
              pattern="circle"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </ArtImage>
          )}
        </motion.div>

        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {t.home.profileIntro}
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="mt-10 space-y-5"
          >
            {t.home.profileParas.map((para) => (
              <motion.p
                key={para}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
                className="max-w-lg text-balance text-base leading-relaxed text-foreground/80"
              >
                <Emph text={para} />
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
