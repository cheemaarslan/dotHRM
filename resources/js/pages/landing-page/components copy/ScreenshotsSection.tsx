import React from 'react';
import { 
  Monitor, 
  LayoutGrid, 
  User, 
  CircleDollarSign, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { getImagePath } from '@/utils/helpers';
import DynamicTitle from './DynamicTitle';

interface ScreenshotsSectionProps {
  brandColor?: string;
  settings?: any;
  globalSettings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    screenshots_list?: Array<{
      src: string;
      alt: string;
      title: string;
      description: string;
    }>;
  };
}

export default function ScreenshotsSection({ brandColor = '#3b82f6', settings, globalSettings, sectionData }: ScreenshotsSectionProps) {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  // Helper to get full URL for images
  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('/screenshots/')) return `${window.appSettings.imageUrl}${path}`;
    return getImagePath(path);
  };

  // Default screenshots if none provided in settings
  const isSaas = globalSettings?.is_saas;
  const screenshotPath = isSaas ? '/screenshots/saas/' : '/screenshots/non-saas/';

  const defaultScreenshots = [
    {
      src: `${screenshotPath}hero.png`,
      alt: t('HRMGo Dashboard Overview'),
      title: t('Dashboard Overview'),
      description: t('Get a complete overview of employee data, payroll, and HR activities in one unified dashboard.')
    },
    {
      src: `${screenshotPath}employee-management.png`,
      alt: t('Employee Management Module'),
      title: t('Employee Management'),
      description: t('Centralized employee profiles with personal details, documents, and job history.')
    },
    {
      src: `${screenshotPath}payroll-payslip.png`,
      alt: t('Payroll Automation'),
      title: t('Payroll & Payslips'),
      description: t('Automated payroll processing with tax calculations, allowances, and downloadable payslips.')
    },
    {
      src: `${screenshotPath}leave.png`,
      alt: t('Leave Management'),
      title: t('Leave Management'),
      description: t('Easily apply, approve, and track employee leave requests with proper workflows and policies.')
    },
    {
      src: `${screenshotPath}attendance.png`,
      alt: t('Attendance Tracking'),
      title: t('Attendance Tracking'),
      description: t('Monitor employee check-ins, check-outs, and shifts with automated attendance logs.')
    },
    {
      src: `${screenshotPath}recruitment.png`,
      alt: t('Recruitment & Onboarding'),
      title: t('Recruitment & Onboarding'),
      description: t('Streamline hiring with applicant tracking and digital onboarding.')
    },
  ];

  const screenshots = sectionData?.screenshots_list && sectionData.screenshots_list.length > 0
    ? sectionData.screenshots_list.map(screenshot => ({
      ...screenshot,
      src: getImageUrl(screenshot.src)
    })).filter(screenshot => screenshot.src) // Filter out screenshots without valid images
    : defaultScreenshots.map(screenshot => ({
      ...screenshot,
      src: getImageUrl(screenshot.src)
    })).filter(screenshot => screenshot.src);

  const getCardStyle = (title: string, index: number) => {
    const normalizedTitle = title.toLowerCase();
    if (normalizedTitle.includes('dashboard')) return { icon: <LayoutGrid className="w-6 h-6" />, bg: 'bg-[#3b82f6]' };
    if (normalizedTitle.includes('employee')) return { icon: <User className="w-6 h-6" />, bg: 'bg-[#10b981]' };
    if (normalizedTitle.includes('payroll')) return { icon: <CircleDollarSign className="w-6 h-6" />, bg: 'bg-[#8b5cf6]' };
    if (normalizedTitle.includes('leave')) return { icon: <Calendar className="w-6 h-6" />, bg: 'bg-[#f97316]' };
    if (normalizedTitle.includes('attendance')) return { icon: <Clock className="w-6 h-6" />, bg: 'bg-[#3b82f6]' };
    if (normalizedTitle.includes('recruitment') || normalizedTitle.includes('onboarding')) return { icon: <Users className="w-6 h-6" />, bg: 'bg-[#ec4899]' };
    
    // Fallbacks
    const styles = [
      { icon: <LayoutGrid className="w-6 h-6" />, bg: 'bg-blue-500' },
      { icon: <User className="w-6 h-6" />, bg: 'bg-emerald-500' },
      { icon: <CircleDollarSign className="w-6 h-6" />, bg: 'bg-purple-500' },
      { icon: <Calendar className="w-6 h-6" />, bg: 'bg-orange-500' },
      { icon: <Clock className="w-6 h-6" />, bg: 'bg-indigo-500' },
      { icon: <Users className="w-6 h-6" />, bg: 'bg-pink-500' },
    ];
    return styles[index % styles.length];
  };

  return (
    <section id="screenshots" className="py-12 sm:py-16 bg-[#fafbfc] relative overflow-hidden min-h-screen flex flex-col justify-center" ref={ref}>
      {/* Background Decorators */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/60 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-indigo-50/60 rounded-full blur-[80px]"></div>
        <div className="absolute top-12 right-12 w-64 h-64 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`flex flex-col items-center text-center mb-10 lg:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100/50 shadow-sm">
            <Sparkles className="w-4 h-4" />
            {t('Powerful Features')}
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight leading-[1.1]">
            <DynamicTitle title={sectionData?.title || t(`Ready to Transform Your \n ,HR Operations?,`)} brandColor={brandColor} />
          </h2>
          
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {sectionData?.subtitle || t('Automate HR processes, simplify payroll, and empower your workforce with dotHRM.')}
          </p>
        </div>

        {screenshots.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {screenshots.map((screenshot, index) => {
              const style = getCardStyle(screenshot.title, index);
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-[20px] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 flex flex-col h-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm ${style.bg}`}>
                      {React.cloneElement(style.icon as React.ReactElement, { className: 'w-5 h-5' })}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-base font-bold text-slate-900 mb-1 tracking-tight">
                        {screenshot.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                        {screenshot.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto relative rounded-xl flex items-end justify-center pt-2">
                    {screenshot.src ? (
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="w-full h-auto object-contain object-bottom rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100/50 group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextElementSibling) {
                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="w-full h-32 flex items-center justify-center text-slate-300 bg-slate-50 rounded-xl" style={{ display: screenshot.src ? 'none' : 'flex' }}>
                      <Monitor className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-slate-300 mb-4 flex justify-center">
              <Monitor className="w-16 h-16" />
            </div>
            <p className="text-slate-500 text-base">{t('No screenshots configured yet. Add some in the admin settings.')}</p>
          </div>
        )}

        <div className={`text-center mt-10 sm:mt-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:text-[#3b82f6] hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
          >
            <Sparkles className="w-4 h-4 text-[#3b82f6]" />
            <span>{t('And many more features to discover')}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3b82f6] group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
