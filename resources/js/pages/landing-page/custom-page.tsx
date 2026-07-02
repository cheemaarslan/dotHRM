import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import Header from './components/Header';
import Footer from './components/Footer';
import PageBreadcrumb from './components/PageBreadcrumb';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ScreenshotsSection from './components/ScreenshotsSection';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUs';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import PlansSection from './components/PlansSection';
import FaqSection from './components/FaqSection';
import NewsletterSection from './components/NewsletterSection';
import ContactSection from './components/ContactSection';
import { useFavicon } from '@/hooks/use-favicon';

interface CustomPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  sections?: string[];
  show_breadcrumb?: boolean;
}

interface CustomPageData {
  id: number;
  title: string;
  slug: string;
}

interface PageProps {
  page: CustomPage;
  customPages: CustomPageData[];
  plans?: any[];
  testimonials?: any[];
  faqs?: any[];
  flash?: { success?: string; error?: string };
  settings: {
    company_name: string;
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
    config_sections?: {
      sections?: Array<{
        key: string;
        [key: string]: any;
      }>;
      theme?: {
        primary_color?: string;
        secondary_color?: string;
        accent_color?: string;
      };
    };
    [key: string]: any;
  };
}

export default function CustomPage() {
  const pageProps = usePage<PageProps>();
  const {
    page,
    customPages = [],
    settings,
    plans = [],
    testimonials = [],
    faqs = [],
    flash,
  } = pageProps.props;
  const globalSettings = (pageProps.props as any).globalSettings;

  // RTL Support for custom pages
  React.useEffect(() => {
    const isDemo = globalSettings?.is_demo || false;
    let storedPosition = 'left';

    if (isDemo) {
      const getCookie = (name: string): string | null => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          const cookieValue = parts.pop()?.split(';').shift();
          return cookieValue ? decodeURIComponent(cookieValue) : null;
        }
        return null;
      };
      const stored = getCookie('layoutPosition');
      if (stored === 'left' || stored === 'right') {
        storedPosition = stored;
      }
    } else {
      const stored = globalSettings?.layoutDirection;
      if (stored === 'left' || stored === 'right') {
        storedPosition = stored;
      }
    }

    const dir = storedPosition === 'right' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('dir', dir);

    setTimeout(() => {
      const actualDir = document.documentElement.getAttribute('dir');
      if (actualDir !== dir) {
        document.documentElement.dir = dir;
        document.documentElement.setAttribute('dir', dir);
      }
    }, 1);
  }, []);

  // Custom CSS for rich-text content styling
  const customCSS = `
    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
      color: #1f2937;
      font-weight: 600;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .prose h1 { font-size: 2.25rem; }
    .prose h2 { font-size: 1.875rem; }
    .prose h3 { font-size: 1.5rem; }
    .prose p { margin-bottom: 1.5rem; line-height: 1.75; }
    .prose ul, .prose ol { margin: 1.5rem 0; padding-left: 1.5rem; }
    .prose li { margin-bottom: 0.5rem; }
    .prose a { color: var(--primary-color); text-decoration: underline; }
    .prose blockquote {
      border-left: 4px solid var(--primary-color);
      padding: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      background-color: #f9fafb;
    }
    .prose img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1.5rem 0; }
  `;

  const primaryColor   = settings?.config_sections?.theme?.primary_color   || '#3b82f6';
  const secondaryColor = settings?.config_sections?.theme?.secondary_color  || '#8b5cf6';
  const accentColor    = settings?.config_sections?.theme?.accent_color     || '#10b77f';

  useFavicon();

  // ── Section data helpers (mirrors the main landing page) ────────────────────
  const getSectionData = (key: string) =>
    settings?.config_sections?.sections?.find((s) => s.key === key) || {};

  // ── Component map for sections ───────────────────────────────────────────────
  const buildSection = (key: string, idx: number) => {
    const props = {
      settings,
      sectionData: getSectionData(key),
      brandColor: primaryColor,
    };

    switch (key) {
      case 'hero':
        return <HeroSection key={idx} {...props} />;

      case 'features':
        return <FeaturesSection key={idx} {...props} />;

      case 'screenshots':
        return (
          <ScreenshotsSection
            key={idx}
            {...props}
            globalSettings={globalSettings}
          />
        );

      case 'why_choose_us':
        return <WhyChooseUs key={idx} {...props} />;

      case 'about':
        return <AboutUs key={idx} {...props} />;

      case 'team':
        return <TeamSection key={idx} {...props} />;

      case 'testimonials':
        return (
          <TestimonialsSection
            key={idx}
            {...props}
            testimonials={testimonials}
          />
        );

      case 'plans':
        return (
          <PlansSection
            key={idx}
            {...props}
            plans={plans}
          />
        );

      case 'faq':
        return (
          <FaqSection
            key={idx}
            {...props}
            faqs={faqs}
          />
        );

      case 'newsletter':
        return (
          <NewsletterSection
            key={idx}
            {...props}
            flash={flash}
          />
        );

      case 'contact':
        return (
          <ContactSection
            key={idx}
            {...props}
            flash={flash}
          />
        );

      case 'content':
        return page.content && page.content.trim().length > 0 ? (
          <div key={idx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </article>
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  const sections: string[] = Array.isArray(page.sections) ? page.sections : [];

  return (
    <>
      <Head title={page.meta_title || page.title}>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
        <style>{customCSS}</style>
      </Head>

      <div
        className="min-h-screen bg-white"
        style={{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
          '--accent-color': accentColor,
          '--primary-color-rgb':
            primaryColor
              .replace('#', '')
              .match(/.{2}/g)
              ?.map((x) => parseInt(x, 16))
              .join(', ') || '59, 130, 246',
          '--secondary-color-rgb':
            secondaryColor
              .replace('#', '')
              .match(/.{2}/g)
              ?.map((x) => parseInt(x, 16))
              .join(', ') || '139, 92, 246',
          '--accent-color-rgb':
            accentColor
              .replace('#', '')
              .match(/.{2}/g)
              ?.map((x) => parseInt(x, 16))
              .join(', ') || '16, 185, 129',
        } as React.CSSProperties}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Header
          settings={settings}
          customPages={customPages}
          sectionData={{ ...getSectionData('header'), transparent: page.show_breadcrumb ? true : getSectionData('header')?.transparent }}
          brandColor={primaryColor}
        />

        <main className={page.show_breadcrumb ? '' : 'pt-20'}>
          {/* ── Breadcrumb hero banner ───────────────────────────────────── */}
          {page.show_breadcrumb && (
            <div className="pt-20">
              <PageBreadcrumb
                title={page.title}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                companyName={settings?.company_name || 'Home'}
              />
            </div>
          )}
          {/* ── Sections-driven layout ──────────────────────────────────── */}
          {sections.length > 0 ? (
            // User has configured sections — render ONLY what they chose, in order.
            // The 'content' key inside sections controls where the rich-text block appears.
            <>
              {sections.map((key, idx) => buildSection(key, idx))}
            </>
          ) : (
            // Fallback: no sections configured — show title + rich-text content (old behaviour)
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
                  <div
                    className="w-24 h-1 mx-auto rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                    }}
                  />
                </header>
                {page.content && page.content.trim().length > 0 && (
                  <article className="prose prose-lg max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                  </article>
                )}
              </div>
            </div>
          )}
        </main>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <Footer
          settings={settings}
          sectionData={getSectionData('footer')}
          brandColor={primaryColor}
        />
      </div>
    </>
  );
}