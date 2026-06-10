"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { navLinks, socials } from "@/lib/data";
import { SpotifyIcon, SoundcloudIcon, YoutubeIcon, InstagramIcon } from "@/components/ui/icons";

const socialLinks = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundcloudIcon },
  { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-2xl md:hidden"
        >
          <div className="grain" />
          <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={clsx(
                      "block py-3 text-center text-3xl font-medium tracking-tight transition-colors duration-300",
                      active ? "text-accent" : "text-foreground hover:text-accent"
                    )}
                  >
                    {t.nav[link.key]}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-center gap-6 pb-12"
          >
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted transition-colors duration-300 hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
