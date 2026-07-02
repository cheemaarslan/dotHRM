import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Mail, CheckCircle, ShieldCheck, Send, ArrowRight, FileText, Lightbulb, BarChart2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/custom-toast';

interface NewsletterSectionProps {
  brandColor?: string;
  flash?: {
    success?: string;
    error?: string;
  };
  settings?: any;
  globalSettings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    privacy_text?: string;
    benefits?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export default function NewsletterSection({ flash, settings, sectionData, globalSettings, brandColor = '#4f46e5' }: NewsletterSectionProps) {
  const { t } = useTranslation();
  
  const { data, setData, post, processing, errors, reset } = useForm({
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSettings?.is_demo) {
      toast.loading(t('Subscribing to newsletter...'));
    }
    
    post(route('landing-page.subscribe'), {
      onSuccess: (page) => {
        reset();
        if (!globalSettings?.is_demo) {
          toast.dismiss();
        }
        if (page.props.flash.success) {
          toast.success(t(page.props.flash.success));
        } else if (page.props.flash.error) {
          toast.error(t(page.props.flash.error));
        }
      },
      onError: (errors) => {
        if (!globalSettings?.is_demo) {
          toast.dismiss();
        }
        if (typeof errors === 'string') {
          toast.error(t(errors));
        } else {
          toast.error(t('Failed to subscribe: {{errors}}', { errors: Object.values(errors).join(', ') }));
        }
      }
    });
  };

  return (
    <section className="py-12 sm:py-16 min-h-screen flex flex-col justify-center bg-white relative overflow-hidden">
      
      {/* Decorative Dots Top Left */}
      <div className="absolute top-10 left-10 opacity-[0.15] hidden lg:block pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <pattern id="dots-tl" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle fill="#64748b" cx="2" cy="2" r="1.5" />
          </pattern>
          <rect width="120" height="120" fill="url(#dots-tl)" />
        </svg>
      </div>

      {/* Decorative Dots Bottom Right */}
      <div className="absolute bottom-10 right-10 opacity-[0.15] hidden lg:block pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <pattern id="dots-br" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle fill="#64748b" cx="2" cy="2" r="1.5" />
          </pattern>
          <rect width="120" height="120" fill="url(#dots-br)" />
        </svg>
      </div>

      {/* Aeroplane Image */}
      <div className="absolute top-[10%] right-[2%] lg:right-[8%] hidden md:block opacity-90 pointer-events-none z-0">
        <img src="/images/default/Aeroplan.png" alt="Aeroplan" className="w-[200px] lg:w-[250px] h-auto object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[12px] font-bold tracking-wide mb-4 border border-indigo-100 shadow-sm">
          <Send className="w-3.5 h-3.5" />
          {t('NEWSLETTER')}
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-4 tracking-tight leading-tight">
          {sectionData?.title || (
            <>{t('Stay Updated with')} <span className="text-[#0f172a]">dotHRM</span></>
          )}
        </h2>
        
        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-500 mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
          {sectionData?.subtitle || t('Get the latest updates, HR tips, and feature announcements delivered straight to your inbox.')}
        </p>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="max-w-[540px] mx-auto mb-4 relative z-20">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-5 h-5" strokeWidth={2} />
              </div>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder={t('Enter your email address')}
                className="w-full pl-12 pr-4 py-[14px] rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 shadow-sm transition-all outline-none text-sm md:text-base"
                required
                disabled={processing}
                aria-label="Email address for newsletter subscription"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0 font-medium">{errors.email}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={processing}
              className="text-white px-6 py-[14px] rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/25 bg-indigo-500 hover:bg-indigo-600 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 sm:min-w-[140px] text-sm md:text-base"
            >
              {processing && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {!processing && <span>{t('Subscribe')}</span>}
              {!processing && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </form>

        {/* Privacy Text */}
        <div className="flex items-center justify-center gap-1.5 text-[13px] text-gray-500 font-medium mb-8 mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2.5} />
          <span>{sectionData?.privacy_text || t('No spam, unsubscribe at any time.')}</span>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-[1.5rem] p-5 lg:p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
            <div className="w-[48px] h-[48px] rounded-xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#0f172a] mb-2">{t('Weekly Updates')}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
              {t('Stay informed about the latest dotHRM features and improvements.')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[1.5rem] p-5 lg:p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
            <div className="w-[48px] h-[48px] rounded-xl bg-emerald-50 flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#0f172a] mb-2">{t('HR Insights')}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
              {t('Get tips and best practices to optimize your HR operations.')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[1.5rem] p-5 lg:p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
            <div className="w-[48px] h-[48px] rounded-xl bg-orange-50 flex items-center justify-center mb-4 text-orange-500 group-hover:scale-110 transition-transform duration-300">
              <BarChart2 className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[#0f172a] mb-2">{t('Reports & Trends')}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
              {t('Receive analytics insights and industry trends directly to your inbox.')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}