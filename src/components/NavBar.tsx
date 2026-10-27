'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DigitalClock } from './DigitalClock';

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function NavBar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Shrink / add background once the user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view to highlight the active link.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled ? 'my-2 py-2' : 'my-3 py-3'
        }`}
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderRadius: scrolled ? '0.9rem' : 0,
          border: scrolled
            ? '1px solid var(--hairline)'
            : '1px solid transparent',
          maxWidth: scrolled ? '66rem' : '72rem',
        }}
      >
        {/* Brand mark */}
        <button
          onClick={() => go('hero')}
          className="group flex items-center gap-2"
          aria-label="Go to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 font-semibold text-[#fff] shadow-lg shadow-red-500/30">
            JB
          </span>
          <span className="hidden text-sm font-medium tracking-wide text-zinc-200 sm:inline">
            Jack Branston
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className="relative px-3 py-2 text-sm transition-colors"
                style={{ color: active === link.id ? 'var(--text-hi)' : 'var(--text-mid)' }}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-red-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: local clock + CTA (desktop) / menu toggle (mobile) */}
        <div className="flex items-center gap-3">
          <DigitalClock />
          <button onClick={() => go('contact')} className="btn btn-primary hidden md:inline-flex">
            Let&apos;s talk
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-200 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-3 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/90 p-2 backdrop-blur-lg md:hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className="block w-full rounded-lg px-4 py-3 text-left text-sm transition-colors"
                style={{ color: active === link.id ? 'var(--accent-soft)' : 'var(--text-hi)' }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="btn btn-primary mt-1 w-full"
            >
              Let&apos;s talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavBar;
