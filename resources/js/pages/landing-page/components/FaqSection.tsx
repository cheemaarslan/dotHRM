import React, { useState } from 'react';
import { Plus, Minus, Check, ArrowRight, Zap } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { getCookie, isDemoMode } from '@/utils/helpers';
import { useTranslation } from 'react-i18next';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  brandColor?: string;
  faqs: Faq[];
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    cta_text?: string;
    button_text?: string;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function FaqSection({ faqs, settings, sectionData, brandColor = '#3b82f6' }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const { props } = usePage();
  const { t } = useTranslation();
  const isDemo = isDemoMode(props);
  
  let themeMode = 'light';
  if (isDemo) {
    const themeSettings = getCookie('themeSettings');
    if (themeSettings) {
      try {
        const parsed = JSON.parse(themeSettings);
        themeMode = parsed.appearance || 'light';
      } catch {
        themeMode = 'light';
      }
    }
  } else {
    themeMode = (props as any).globalSettings?.themeMode || 'light';
  }
  
  const isDark = themeMode === 'dark';

  // Default FAQs matching the exact design
  const defaultFaqs = [
    {
      id: 1,
      question: 'What is dotHRM?',
      answer: 'dotHRM is an all-in-one HR management software that helps businesses automate HR processes, manage employees, payroll, attendance, recruitment, and more.'
    },
    { id: 2, question: 'Who is dotHRM designed for?', answer: 'dotHRM is designed for small to medium-sized businesses looking to streamline their HR operations.' },
    { id: 3, question: 'Does dotHRM support payroll processing?', answer: 'Yes, dotHRM includes comprehensive payroll processing features tailored for various compliance requirements.' },
    { id: 4, question: 'Can employees access their own HR information?', answer: 'Yes, employees have access to a self-service portal where they can view their pay slips, request time off, and update personal information.' },
    { id: 5, question: 'Is dotHRM accessible from anywhere?', answer: 'Absolutely! As a cloud-based solution, you can access dotHRM from any device with an internet connection.' },
    { id: 6, question: 'How secure is employee data in dotHRM?', answer: 'We prioritize security by employing industry-standard encryption protocols and regular security audits to protect your data.' },
    { id: 7, question: 'Can dotHRM be customized for my organization?', answer: 'Yes, dotHRM offers extensive customization options to fit the unique workflows and policies of your organization.' },
    { id: 8, question: 'How do I get started with dotHRM?', answer: 'Getting started is easy! Sign up for a free trial on our website, and our onboarding team will guide you through the setup process.' },
  ];

  const backendFaqs = sectionData?.faqs?.map((faq, index) => ({
    id: index + 1,
    ...faq
  })) || defaultFaqs;

  const displayFaqs = faqs.length > 0 ? faqs : backendFaqs;

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className={`py-12 sm:py-16 min-h-screen flex flex-col justify-center ${isDark ? 'bg-gray-900' : 'bg-[#fafbfc]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-6 lg:w-7/12 xl:w-8/12">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'} mb-3 tracking-tight leading-tight`}>
            {sectionData?.title || t('Frequently Asked Questions')}
          </h2>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
            {sectionData?.subtitle || t("Got questions? We've got answers.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column - FAQs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-2">
              {displayFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                      isOpen 
                        ? (isDark ? 'border-indigo-500/30 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.15)] bg-gray-800' : 'border-indigo-100 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.05)] bg-white')
                        : (isDark ? 'border-gray-800 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-100 bg-white hover:border-gray-200')
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className={`w-full px-4 py-3 text-left flex justify-between items-center transition-colors focus:outline-none ${isOpen && !isDark ? 'bg-white' : ''}`}
                    >
                      <h3 className={`text-[15px] font-bold pr-4 transition-colors ${
                        isOpen ? (isDark ? 'text-indigo-400' : 'text-[#0f172a]') : (isDark ? 'text-gray-300' : 'text-[#0f172a]')
                      }`}>
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <Minus className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-blue-600'}`} />
                        ) : (
                          <Plus className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-blue-600'}`} />
                        )}
                      </div>
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className={`px-4 pb-4 pt-1 ${isDark ? 'bg-gray-800/50' : 'bg-[#f4f5fa]'}`}>
                        <p className={`text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          {/* Right Column - Support Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className={`rounded-3xl p-5 md:p-6 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-[#f8f9fe] border-indigo-50/50'} shadow-sm`}>
              {/* Top Image */}
              <div className="flex justify-center mb-5 relative">
                <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-3xl opacity-50 scale-75"></div>
                <img 
                  src="/images/default/headphone_message.png" 
                  alt="Support" 
                  className="w-32 h-auto relative z-10 drop-shadow-xl"
                />
              </div>

              <div className="text-center mb-5">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
                  {sectionData?.cta_text || t('Still have questions?')}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('Our friendly support team is ready to help you.')}
                </p>
              </div>

              {/* Check List */}
              <ul className="space-y-2 mb-5 pl-4 md:pl-6">
                {[
                  t('Quick response'),
                  t('Expert guidance'),
                  t('Real human support')
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-[16px] h-[16px] rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                      <Check className="w-2 h-2" strokeWidth={3.5} />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:opacity-90 transition-opacity mb-5 shadow-md text-sm"
              >
                {sectionData?.button_text || t('Contact Support')}
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Response Time */}
              <div className="text-center">
                <p className={`text-xs mb-2 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('Average response time')}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 text-[10px] font-bold">
                  <Zap className="w-3 h-3" fill="currentColor" />
                  {t('Under 2 minutes')}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}