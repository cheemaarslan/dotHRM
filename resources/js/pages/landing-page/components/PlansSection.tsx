import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Lock, Headphones, RefreshCw, Box, Rocket, Crown, BadgePercent, Star } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { isUserRegistrationEnabled, getCookie, isDemoMode } from '@/utils/helpers';

// Simple encryption function for plan ID
const encryptPlanId = (planId: number): string => {
  const key = 'vCardGo2024';
  const str = planId.toString();
  let encrypted = '';
  for (let i = 0; i < str.length; i++) {
    encrypted += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(encrypted);
};

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  yearly_price?: number;
  duration: string;
  features?: string[];
  stats?: Record<string, string | number>;
  is_popular?: boolean;
  is_plan_enable: string;
}

interface PlansSectionProps {
  brandColor?: string;
  plans: Plan[];
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    faq_text?: string;
  };
}

function PlansSection({ plans, settings, sectionData, brandColor = '#3b82f6' }: PlansSectionProps) {
  const { t, i18n } = useTranslation();
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { ref, isVisible } = useScrollAnimation();
  const { props } = usePage();
  const isSaas = (props as any).globalSettings?.is_saas;
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

  // Force re-render when language changes
  React.useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate();
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  // Filter enabled plans
  const enabledPlans = plans.filter(plan => plan.is_plan_enable === 'on');

  // Default plans matching the exact design
  const defaultPlans: Plan[] = [
    {
      id: 1,
      name: 'Free',
      description: 'Basic plan for small businesses just getting started.',
      price: 0,
      yearly_price: 0,
      duration: 'month',
      stats: { Users: '2', Employees: '5', Storage: '1GB' },
      features: [],
      is_popular: false,
      is_plan_enable: 'on'
    },
    {
      id: 2,
      name: 'Starter',
      description: 'Perfect for small businesses looking to grow their online presence.',
      price: 19.99,
      yearly_price: 199.90,
      duration: 'month',
      stats: { Users: '10', Employees: '25', Storage: '5GB' },
      features: [],
      is_popular: false,
      is_plan_enable: 'on'
    },
    {
      id: 3,
      name: 'Pro',
      description: 'Ideal for growing businesses with multiple stores and advanced needs.',
      price: 49.99,
      yearly_price: 499.90,
      duration: 'month',
      stats: { Users: '50', Employees: '100', Storage: '50GB' },
      features: ['AI Integration'],
      is_popular: true,
      is_plan_enable: 'on'
    }
  ];

  const displayPlans = enabledPlans.length > 0 ? enabledPlans : defaultPlans;

  const formatCurrency = (amount: string | number) => {
    if (typeof window !== 'undefined' && window.appSettings?.formatCurrency) {
      const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount);
      return window.appSettings.formatCurrency(numericAmount, { showSymbol: true });
    }
    return `$${amount}`;
  };

  const getPrice = (plan: Plan) => {
    if (billingCycle === 'yearly' && plan.yearly_price !== undefined) {
      return plan.yearly_price;
    }
    return plan.price;
  };

  const cardThemes = [
    {
      icon: Box,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      cardBorder: 'border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg',
      checkBg: 'bg-blue-100',
      checkIconColor: 'text-blue-600',
      btnClass: 'text-blue-600 border border-blue-200 hover:bg-blue-50',
    },
    {
      icon: Rocket,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      cardBorder: 'border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg',
      checkBg: 'bg-emerald-100',
      checkIconColor: 'text-emerald-500',
      btnClass: 'text-emerald-500 border border-emerald-200 hover:bg-emerald-50',
    },
    {
      icon: Crown,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-50',
      cardBorder: 'border-indigo-400 shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] lg:scale-[1.03] z-10 border',
      checkBg: 'bg-indigo-500',
      checkIconColor: 'text-white',
      btnClass: 'text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 border-transparent',
      isRecommended: true
    }
  ];

  return (
    <section id="pricing" className={`py-12 sm:py-16 relative overflow-hidden min-h-screen flex flex-col justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Section */}
        <div className={`text-center mb-8 lg:mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide mb-4">
            <BadgePercent className="w-3.5 h-3.5" />
            {t('SIMPLE PRICING')}
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold ${isDark ? 'text-white' : 'text-[#0f172a]'} mb-3 tracking-tight leading-tight`}>
            {sectionData?.title?.includes('dotHRM') ? (
              <>
                {t('Choose Your')} <span className="text-blue-600">dotHRM</span> {t('Plan')}
              </>
            ) : (
              sectionData?.title || <>{t('Choose Your')} <span className="text-blue-600">dotHRM</span> {t('Plan')}</>
            )}
          </h2>
          
          <p className={`text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto mb-6 leading-relaxed font-medium`}>
            {sectionData?.subtitle || t('Start with our free plan and upgrade as your team grows.')}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm md:text-base ${billingCycle === 'monthly' ? (isDark ? 'text-white' : 'text-[#0f172a]') + ' font-bold' : (isDark ? 'text-gray-400' : 'text-gray-500 font-medium')}`}>
              {t('Monthly')}
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer border-transparent"
              style={{ backgroundColor: '#4f46e5' }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  } shadow-sm`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm md:text-base ${billingCycle === 'yearly' ? (isDark ? 'text-white' : 'text-[#0f172a]') + ' font-bold' : (isDark ? 'text-gray-400' : 'text-gray-500 font-medium')}`}>
                {t('Yearly')}
              </span>
              <span className="bg-blue-50 text-blue-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">
                {t('Save 20%')}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {displayPlans.map((plan, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const Icon = theme.icon;
            
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[1.5rem] p-5 lg:p-6 transition-all duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'} ${theme.cardBorder}`}
              >
                {/* Recommended Badge */}
                {theme.isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-md" style={{ backgroundColor: '#7c3aed' }}>
                      <Star className="w-3 h-3 fill-current" />
                      {t('RECOMMENDED')}
                    </div>
                  </div>
                )}
                
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg} ${theme.iconColor}`}>
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-[#0f172a]'} tracking-tight`}>
                        {getPrice(plan) === 0 ? '$0' : formatCurrency(getPrice(plan))}
                      </span>
                      <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{billingCycle === 'yearly' ? t('year') : t('month')}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[13px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>
                
                <div className="w-full h-px bg-gray-100/80 my-5"></div>

                {/* Features & Stats */}
                <div className="flex-grow">
                  {(plan.stats || plan.features?.length > 0) && (
                    <h4 className={`text-[10px] font-bold mb-4 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t("What's Included")}
                    </h4>
                  )}
                  
                  {/* Stats List */}
                  {plan.stats && Object.keys(plan.stats).length > 0 && (
                    <div className="space-y-3 mb-5">
                      {Object.entries(plan.stats).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${theme.checkBg}`}>
                              <Check className={`w-2.5 h-2.5 ${theme.checkIconColor}`} strokeWidth={3} />
                            </div>
                            <span className={`text-[13px] font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{key}</span>
                          </div>
                          <span className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{val as React.ReactNode}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features List */}
                  {plan.features?.length > 0 && (
                    <div className="mt-5">
                      {plan.stats && Object.keys(plan.stats).length > 0 && (
                        <h4 className={`text-[10px] font-bold mb-4 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t("Features")}
                        </h4>
                      )}
                      <div className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${theme.checkBg}`}>
                              <Check className={`w-2.5 h-2.5 ${theme.checkIconColor}`} strokeWidth={3} />
                            </div>
                            <span className={`text-[13px] font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Button */}
                <div className="mt-6">
                    {isSaas && isUserRegistrationEnabled() ? (
                      <Link
                        href={route('register', { plan: encryptPlanId(plan.id) })}
                        className={`block w-full text-center py-2.5 px-4 rounded-[0.75rem] font-bold transition-all text-sm ${theme.btnClass}`}
                      >
                        {plan.price === 0 ? t('Start Free') : t('Get Started')}
                        <ArrowRight className="w-3.5 h-3.5 inline-block ml-1.5" />
                      </Link>
                    ) : (
                      <Link
                        href={route('login')}
                        className={`block w-full text-center py-2.5 px-4 rounded-[0.75rem] font-bold transition-all text-sm ${theme.btnClass}`}
                      >
                        {t('Login')}
                        <ArrowRight className="w-3.5 h-3.5 inline-block ml-1.5" />
                      </Link>
                    )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Features Banner */}
        <div className={`mt-10 max-w-5xl mx-auto bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{t('No Setup Fees')}</h4>
                <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('Get started in minutes.')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-500">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{t('Secure & Compliant')}</h4>
                <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('Enterprise-grade security.')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-500">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{t('24/7 Support')}</h4>
                <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t("We're here when you need us.")}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-500">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{t('Cancel Anytime')}</h4>
                <p className={`text-[11px] mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('No contracts, no surprises.')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-6 mb-0">
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {sectionData?.faq_text || t('Have questions about our plans? Reach out to our sales team for guidance.')}
          </p>
        </div>
        
      </div>
    </section>
  );
}

export default PlansSection;