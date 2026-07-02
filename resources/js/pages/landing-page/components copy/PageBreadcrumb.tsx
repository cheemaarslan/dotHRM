import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  title: string;
  items?: BreadcrumbItem[];
  primaryColor?: string;
  secondaryColor?: string;
  companyName?: string;
}

export default function PageBreadcrumb({
  title,
  items = [],
  primaryColor = '#3b82f6',
  secondaryColor = '#8b5cf6',
  companyName = 'Home',
}: PageBreadcrumbProps) {
  // Convert hex to rgb for CSS custom properties
  const hexToRgb = (hex: string) =>
    hex
      .replace('#', '')
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16))
      .join(', ') || '59, 130, 246';

  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);

  // Build full crumb trail
  const crumbs: BreadcrumbItem[] = [
    { label: companyName, href: route('home') },
    ...items,
    { label: title },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={
        {
          '--bc-primary': primaryColor,
          '--bc-secondary': secondaryColor,
          '--bc-primary-rgb': primaryRgb,
          '--bc-secondary-rgb': secondaryRgb,
        } as React.CSSProperties
      }
    >
      {/* ── Gradient background ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.15) 100%)`,
          backgroundColor: `rgba(${primaryRgb}, 1)`
        }}
      />

      {/* ── Mesh / noise texture overlay ────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Decorative blobs ─────────────────────────────────────────────── */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-20 blur-3xl z-0 pointer-events-none"
        style={{ background: '#ffffff' }}
      />
      <div
        className="absolute bottom-0 -left-8 w-48 h-48 rounded-full opacity-10 blur-2xl z-0 pointer-events-none"
        style={{ background: '#ffffff' }}
      />

      {/* ── Dot grid pattern ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Diagonal lines (right side accent) ──────────────────────────── */}
      <div
        className="absolute right-0 top-0 h-full w-1/3 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 10px,
            #ffffff 10px,
            #ffffff 11px
          )`,
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center gap-5">

          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Home className="h-3 w-3 text-white/70" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-white/80">
              {companyName}
            </span>
          </div>

          {/* Page title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
            {title}
          </h1>

          {/* Gradient underline */}
          <div
            className="w-16 h-1 rounded-full opacity-60"
            style={{ background: 'rgba(255,255,255,0.7)' }}
          />

          {/* ── Breadcrumb trail ─────────────────────────────────────────── */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center flex-wrap gap-1 mt-1"
          >
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/40 shrink-0" />
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="group flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white transition-colors duration-200"
                    >
                      {idx === 0 && <Home className="h-3.5 w-3.5 shrink-0" />}
                      <span className="group-hover:underline underline-offset-2">
                        {crumb.label}
                      </span>
                    </Link>
                  ) : (
                    <span
                      className="text-sm font-semibold text-white"
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

        </div>
      </div>

      {/* ── Bottom wave SVG ──────────────────────────────────────────────── */}
      <div className="relative z-10 -mb-px overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 42"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[42px] block"
          style={{ fill: '#ffffff' }}
        >
          <path d="M0,42 C240,0 480,42 720,21 C960,0 1200,42 1440,21 L1440,42 Z" />
        </svg>
      </div>
    </section>
  );
}
