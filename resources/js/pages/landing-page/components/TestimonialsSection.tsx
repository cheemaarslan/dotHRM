import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Star, Quote, MessageCircle, Shield, Briefcase, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import DynamicTitle from './DynamicTitle';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  brandColor?: string;
  testimonials: Testimonial[];
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    trust_title?: string;
    trust_stats?: Array<{
      value: string;
      label: string;
      color: string;
    }>;
    default_testimonials?: Array<{
      name: string;
      role: string;
      company?: string;
      content: string;
      rating: number;
    }>;
  };
}

const AUTOPLAY_MS = 4000;

export default function TestimonialsSection({ testimonials, settings, sectionData, brandColor = '#4f46e5' }: TestimonialsSectionProps) {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const defaultTestimonials = sectionData?.testimonials?.map((testimonial: any, index: number) => ({
    id: index + 1,
    ...testimonial
  })) || [
      {
        name: 'Alice Johnson',
        role: 'HR Manager',
        company: 'GlobalTech Ltd.',
        content: 'HRM has made managing employee records and attendance effortless. Our HR team saves hours every week!',
        rating: 5,
        avatar: '/images/default/avatar-1.jpg'
      },
      {
        name: 'Robert Smith',
        role: 'Operations Head',
        company: 'Innovate Solutions',
        content: 'The payroll automation is incredibly accurate and easy to use. No more manual calculations or errors!',
        rating: 5,
        avatar: '/images/default/avatar-2.jpg'
      },
      {
        name: 'Maria Davis',
        role: 'CEO',
        company: 'BrightFuture Corp.',
        content: 'From recruitment to performance management, HRM covers everything we need in one platform.',
        rating: 5,
        avatar: '/images/default/avatar-3.jpg'
      },
      {
        name: 'David Lee',
        role: 'Talent Acquisition Lead',
        company: 'NextGen Enterprises',
        content: 'Recruitment and onboarding have never been smoother. HRM platform is intuitive and efficient.',
        rating: 5,
        avatar: '/images/default/avatar-4.jpg'
      },
      {
        name: 'Samantha Green',
        role: 'Payroll Specialist',
        company: 'BrightSolutions Inc.',
        content: 'Payroll processing is now quick and error-free thanks to HRM. It has transformed our monthly workflow.',
        rating: 5,
        avatar: '/images/default/avatar-5.jpg'
      },
      {
        name: 'Michael Brown',
        role: 'HR Coordinator',
        company: 'TechWave Ltd.',
        content: 'The performance management module helps us track employee goals and progress effortlessly.',
        rating: 5,
        avatar: '/images/default/avatar-6.jpg'
      },
    ];

  const displayTestimonials: Testimonial[] = (testimonials.length > 0 ? testimonials : defaultTestimonials).map(
    (item: any, i: number) => ({ id: item.id ?? i + 1, ...item })
  );

  const count = displayTestimonials.length;

  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const goTo = useCallback((i: number) => setIndex(mod(i, count)), [count]);
  const next = useCallback(() => setIndex((i) => mod(i + 1, count)), [count]);
  const prev = useCallback(() => setIndex((i) => mod(i - 1, count)), [count]);

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, count]);

  const renderStars = (rating: number, sizeClass = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClass} ${i < rating ? 'fill-indigo-500 text-indigo-500' : 'text-gray-300'}`}
      />
    ));
  };

  const Card = ({ testimonial, isCenter }: { testimonial: Testimonial; isCenter: boolean }) => {
    return (
      <div
        className={`bg-white border rounded-[20px] p-5 lg:p-6 relative overflow-hidden flex flex-col h-full transition-all duration-500 ease-out ${
          isCenter ? 'border-indigo-100 shadow-[0_20px_50px_rgb(79,70,229,0.15)]' : 'border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
        }`}
      >
        <Quote className="absolute top-4 right-4 w-12 h-12 text-indigo-50 opacity-50 transform rotate-180 pointer-events-none" />

        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mb-3 relative z-10">
          <Quote className="w-3.5 h-3.5 text-indigo-600" />
        </div>

        <div className="flex items-center gap-1 mb-3 relative z-10">
          {renderStars(testimonial.rating, "w-3 h-3")}
        </div>

        <p className="text-[13px] text-gray-700 leading-relaxed mb-4 flex-1 relative z-10 font-medium">
          "{testimonial.content}"
        </p>

        <div className="border-t border-gray-100 pt-4 mt-auto relative z-10">
          <div className="flex items-center gap-3">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold ${testimonial.avatar ? 'hidden' : ''}`}>
              {testimonial.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div>
              <h4 className="font-bold text-[13px] text-gray-900 leading-tight mb-0.5">
                {testimonial.name}
              </h4>
              <p className="text-[12px] text-gray-500">
                {testimonial.role}
                {testimonial.company && (
                  <>
                    <span className="text-gray-300 mx-1.5">•</span>
                    <span className="text-indigo-600 font-medium">{testimonial.company}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const prevT = displayTestimonials[mod(index - 1, count)];
  const centerT = displayTestimonials[index];
  const nextT = displayTestimonials[mod(index + 1, count)];

  return (
    <section className="py-16 sm:py-24 bg-[#f1f5f9] relative overflow-hidden" ref={ref}>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-200 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        <div className={`text-center mb-6 lg:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full mb-3 border border-indigo-100">
            <MessageCircle className="w-3.5 h-3.5 text-indigo-600" fill="currentColor" />
            <span className="text-[11px] font-bold text-indigo-600 tracking-wide">{t('CLIENT LOVE')}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-3 tracking-tight">
            <DynamicTitle title={sectionData?.title || t(`What Our ,Clients, Say`)} brandColor={brandColor} />
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {sectionData?.subtitle || t('Trusted by HR leaders and teams worldwide to simplify processes, save time, and drive real results.')}
          </p>
        </div>

        {/* Slider */}
        <div
          className={`mb-6 lg:mb-8 transition-all duration-700 delay-200 w-full max-w-[1100px] mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative w-full">
            {/* Invisible dummy card to set slider height dynamically without shaking */}
            <div className="w-full md:w-1/3 px-2 md:px-3 lg:px-4 opacity-0 pointer-events-none mx-auto" aria-hidden="true">
              <Card 
                testimonial={displayTestimonials.reduce((prev, current) => (prev.content.length > current.content.length) ? prev : current)} 
                isCenter={true} 
              />
            </div>

          {/* Absolute cards */}
          <div className="absolute top-0 left-0 w-full h-full">
            {displayTestimonials.map((testimonial, i) => {
              let diff = i - index;
              // Circular offset calculation for infinite slide
              if (diff > Math.floor(count / 2)) diff -= count;
              if (diff < -Math.floor(count / 2)) diff += count;

              const isCenter = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              let transformStyle = '';
              let opacityStyle = 'opacity-0 pointer-events-none';
              let zIndex = 'z-0';
              let scale = 'scale-75';

              if (isCenter) {
                // Mobile: center, Desktop: center (1/3 width, so left is 33.33%)
                transformStyle = 'translate-x-0 md:translate-x-full';
                opacityStyle = 'opacity-100 pointer-events-auto';
                zIndex = 'z-20';
                scale = 'scale-100';
              } else if (isPrev) {
                transformStyle = '-translate-x-full md:translate-x-0';
                opacityStyle = 'opacity-0 md:opacity-50 pointer-events-none md:pointer-events-auto';
                zIndex = 'z-10';
                scale = 'scale-90';
              } else if (isNext) {
                transformStyle = 'translate-x-full md:translate-x-[200%]';
                opacityStyle = 'opacity-0 md:opacity-50 pointer-events-none md:pointer-events-auto';
                zIndex = 'z-10';
                scale = 'scale-90';
              } else if (diff > 1) {
                transformStyle = 'translate-x-[200%] md:translate-x-[300%]';
                opacityStyle = 'opacity-0 pointer-events-none';
                zIndex = 'z-0';
                scale = 'scale-75';
              } else if (diff < -1) {
                transformStyle = '-translate-x-[200%] md:-translate-x-full';
                opacityStyle = 'opacity-0 pointer-events-none';
                zIndex = 'z-0';
                scale = 'scale-75';
              }

              return (
                <div
                  key={testimonial.id}
                  className={`absolute top-0 left-0 w-full md:w-1/3 h-full px-2 md:px-3 lg:px-4 transition-all duration-500 ease-in-out ${transformStyle} ${zIndex}`}
                >
                  <div className={`w-full h-full transition-all duration-500 ease-in-out origin-center ${opacityStyle} ${scale}`}>
                    <Card testimonial={testimonial} isCenter={isCenter} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          {count > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="hidden md:flex absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 -translate-x-full w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors z-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="hidden md:flex absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 translate-x-full w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors z-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          </div>

          {/* Dots */}
          {count > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 lg:mt-8">
              {displayTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 relative z-30 ${
                    i === index ? 'w-6 bg-indigo-600' : 'w-1.5 bg-indigo-200 hover:bg-indigo-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Trust Banner */}
        <div className={`bg-white rounded-[24px] p-5 lg:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="flex items-center gap-4 lg:w-1/3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
               <Shield className="w-6 h-6 text-indigo-500" fill="currentColor" />
               <Star className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                {t('Trusted by')}<br />{t('HR Professionals Worldwide')}
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed max-w-[280px]">
                {t('Join hundreds of organizations that rely on dotHRM to build better workplaces and stronger teams.')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8 lg:pl-6 lg:border-l border-gray-100 flex-1 justify-center lg:justify-end w-full lg:w-auto">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-purple-500" fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-tight mb-0.5">4.9/5</div>
                <div className="text-[11px] text-gray-500 font-medium mb-1">{t('Average Rating')}</div>
                <div className="flex items-center gap-0.5">
                   {renderStars(5, "w-2.5 h-2.5")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-green-500" fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-tight mb-0.5">500+</div>
                <div className="text-[11px] text-gray-500 font-medium mb-0.5">{t('Companies Served')}</div>
                <div className="text-[10px] text-gray-400">{t('Across 20+ industries')}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-orange-500" fill="currentColor" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-tight mb-0.5">10K+</div>
                <div className="text-[11px] text-gray-500 font-medium mb-0.5">{t('HR Users')}</div>
                <div className="text-[10px] text-gray-400">{t('Using dotHRM daily')}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}