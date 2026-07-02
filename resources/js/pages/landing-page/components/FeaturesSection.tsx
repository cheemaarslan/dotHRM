import React from 'react';
import { 
  QrCode, Smartphone, Share2, BarChart3, Globe, Shield, Star, Zap, Users, Lock, Wifi, Heart, DollarSign, Clock, UserPlus, Award, BarChart2,
  User, CreditCard, Plane, UserSearch, LineChart, Calendar, Megaphone, Receipt, MoreHorizontal, Check, ArrowRight, CheckCircle2, FileText
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import DynamicTitle from './DynamicTitle';

interface Feature {
  title: string;
  description: string;
  icon: string;
  theme?: string;
  subFeatures?: string[];
  imagePath?: string;
}

interface FeaturesSectionProps {
  brandColor?: string;
  settings: any;
  sectionData: {
    title?: string;
    description?: string;
    features_list?: Feature[];
    background_color?: string;
    columns?: number;
    layout?: string;
    show_icons?: boolean;
    image?: string;
  };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'qr-code': QrCode,
  'smartphone': Smartphone,
  'share': Share2,
  'bar-chart': BarChart3,
  'globe': Globe,
  'shield': Shield,
  'star': Star,
  'zap': Zap,
  'users': Users,
  'lock': Lock,
  'wifi': Wifi,
  'heart': Heart,
  'dollar-sign' : DollarSign,
  'clock' : Clock,
  'user-plus' : UserPlus,
  'award' : Award,
  'bar-chart-2' : BarChart2,
  'user': User,
  'credit-card': CreditCard,
  'plane': Plane,
  'user-search': UserSearch,
  'line-chart': LineChart,
  'file-text': FileText
};

const themeMap: Record<string, { iconBg: string, iconColor: string, checkFill: string, checkText: string, lineGradient: string }> = {
  'blue': {
    iconBg: 'bg-[#1E5EFF]',
    iconColor: 'text-white',
    checkFill: 'fill-[#1E5EFF]',
    checkText: 'text-white',
    lineGradient: 'from-[#1E5EFF]/40'
  },
  'emerald': {
    iconBg: 'bg-[#10B981]',
    iconColor: 'text-white',
    checkFill: 'fill-[#10B981]',
    checkText: 'text-white',
    lineGradient: 'from-[#10B981]/40'
  },
  'purple': {
    iconBg: 'bg-[#8B5CF6]',
    iconColor: 'text-white',
    checkFill: 'fill-[#8B5CF6]',
    checkText: 'text-white',
    lineGradient: 'from-[#8B5CF6]/40'
  },
  'orange': {
    iconBg: 'bg-[#F59E0B]',
    iconColor: 'text-white',
    checkFill: 'fill-[#F59E0B]',
    checkText: 'text-white',
    lineGradient: 'from-[#F59E0B]/40'
  },
  'pink': {
    iconBg: 'bg-[#EC4899]',
    iconColor: 'text-white',
    checkFill: 'fill-[#EC4899]',
    checkText: 'text-white',
    lineGradient: 'from-[#EC4899]/40'
  },
  'blue-alt': {
    iconBg: 'bg-[#3B82F6]',
    iconColor: 'text-white',
    checkFill: 'fill-[#3B82F6]',
    checkText: 'text-white',
    lineGradient: 'from-[#3B82F6]/40'
  },
  'default': {
    iconBg: 'bg-slate-800',
    iconColor: 'text-white',
    checkFill: 'fill-slate-800',
    checkText: 'text-white',
    lineGradient: 'from-slate-800/40'
  }
};

export default function FeaturesSection({ settings, sectionData, brandColor = '#3b82f6' }: FeaturesSectionProps) {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    // @ts-ignore
    return `${window.appSettings?.imageUrl || ''}${path}`;
  };

  const backgroundColor = sectionData.background_color || '#F8FAFC';
  const showIcons = sectionData.show_icons !== false;

  const defaultFeatures: Feature[] = [
    {
      icon: 'user',
      title: t('Employee Management'),
      description: t('Everything about your people in\none secure place.'),
      theme: 'blue',
      imagePath: '/images/features/1.jpeg',
      subFeatures: [
        t('Employee Profiles'),
        t('Document Management'),
        t('Departments & Designations'),
        t('Lifecycle Tracking'),
        t('Organization Structure')
      ]
    },
    {
      icon: 'clock',
      title: t('Attendance Management'),
      description: t('Track attendance, manage shifts\nand improve punctuality.'),
      theme: 'emerald',
      imagePath: '/images/features/2.jpeg',
      subFeatures: [
        t('Daily Attendance'),
        t('Shift Management'),
        t('Late Arrival Tracking'),
        t('Overtime Management'),
        t('Attendance Reports')
      ]
    },
    {
      icon: 'credit-card',
      title: t('Payroll Management'),
      description: t('Automate payroll and ensure\naccuracy every time.'),
      theme: 'purple',
      imagePath: '/images/features/3.jpeg',
      subFeatures: [
        t('Payroll Generation'),
        t('Allowances & Deductions'),
        t('Overtime Calculations'),
        t('Payslip Generation'),
        t('Salary History')
      ]
    },
    {
      icon: 'plane',
      title: t('Leave Management'),
      description: t('Simplify leave requests and\napprovals.'),
      theme: 'orange',
      imagePath: '/images/features/4.jpeg',
      subFeatures: [
        t('Leave Applications'),
        t('Approval Workflows'),
        t('Leave Balances'),
        t('Leave Calendar'),
        t('Leave Reports')
      ]
    },
    {
      icon: 'user-search',
      title: t('Recruitment Management'),
      description: t('Hire the right talent faster\nand smarter.'),
      theme: 'pink',
      imagePath: '/images/features/5.jpeg',
      subFeatures: [
        t('Job Postings'),
        t('Applicant Tracking'),
        t('Interview Scheduling'),
        t('Offer Management'),
        t('Hiring Pipeline')
      ]
    },
    {
      icon: 'line-chart',
      title: t('Performance Management'),
      description: t('Drive growth with goals,\nfeedback and reviews.'),
      theme: 'blue-alt',
      imagePath: '/images/features/6.jpeg',
      subFeatures: [
        t('Goal Setting'),
        t('Performance Reviews'),
        t('360° Feedback'),
        t('Competency Tracking'),
        t('Performance Reports')
      ]
    }
  ];

  const rawFeatures = sectionData.features_list && sectionData.features_list.length > 0
    ? sectionData.features_list
    : defaultFeatures;

  const themesList = ['blue', 'emerald', 'purple', 'orange', 'pink', 'blue-alt'];

  const features = rawFeatures.slice(0, 6).map((feature, index) => {
    let description = feature.description || '';
    let subFeatures = feature.subFeatures ? [...feature.subFeatures] : [];

    // Parse list items from description if they were added via wysiwyg editor
    if (description.includes('<ul>') || description.includes('<li>')) {
       const liRegex = /<li>(.*?)<\/li>/gi;
       let match;
       while ((match = liRegex.exec(description)) !== null) {
         subFeatures.push(match[1].replace(/<[^>]*>?/gm, '').trim());
       }
       // remove ul and ol tags and their contents
       description = description.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, '').trim();
       description = description.replace(/<ol[^>]*>[\s\S]*?<\/ol>/gi, '').trim();
       // remove trailing empty p or br
       description = description.replace(/^(<br\s*\/?>|\s|&nbsp;|<p><\/p>)+|(<br\s*\/?>|\s|&nbsp;|<p><\/p>)+$/g, '');
    }

    const themeName = feature.theme || themesList[index % themesList.length];

    return {
      ...feature,
      description,
      subFeatures,
      theme: themeName
    };
  });

  const additionalFeatures = [
    { icon: User, label: t('Employee Self Service') },
    { icon: Megaphone, label: t('Announcements') },
    { icon: Receipt, label: t('Expense Management') },
    { icon: Shield, label: t('Policy Management') },
  ];

  return (
    <section id="features" className="min-h-screen py-12 sm:py-16 flex flex-col justify-center overflow-hidden relative" style={{ backgroundColor }} ref={ref}>
      {/* Aesthetic background glows matching the image */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className={`text-center mb-10 sm:mb-12 transition-all cubic-bezier(0.4,0,0.2,1) duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center mb-4">
            <span 
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-sm"
            >
              {t('ONE PLATFORM. EVERY HR FUNCTION.')}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            <DynamicTitle title={sectionData?.title || t(`Everything Your ,HR Team, Needs`)} brandColor={brandColor} />
  
          </h2>
          <div className="text-sm sm:text-base text-slate-500 max-w-3xl mx-auto leading-snug font-medium mt-4">
            <p>{t('Stop managing employee records in spreadsheets and disconnected systems.')}<br className="hidden sm:block"/>
            {t('dotHRM provides a complete HR ecosystem that helps organizations streamline operations, improve productivity, and ensure compliance.')}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || QrCode;
            const theme = themeMap[feature.theme || 'default'] || themeMap['default'];
            const bgImage = feature.imagePath ? getImageUrl(feature.imagePath) : getImageUrl(`/images/features/${(index % 6) + 1}.jpeg`);

            return (
              <div 
                key={index} 
                className="group rounded-[1.5rem] p-6 lg:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full min-h-[360px] relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: ['#EAF2FC', '#E5E2F8', '#DBEFE8', '#FCF6E9', '#FDEBF2', '#FDEBF2'][index] || '#ffffff' }}
              >
                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {showIcons && (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-transform duration-300 group-hover:scale-105 ${theme.iconBg}`}>
                      <IconComponent className={`w-5 h-5 ${theme.iconColor}`} />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-slate-800 transition-colors">{feature.title}</h3>
                  <div 
                    className="text-sm text-slate-500 leading-snug whitespace-pre-line max-w-[90%]"
                    dangerouslySetInnerHTML={{ __html: feature.description || '' }}
                  />
                  
                  {feature.subFeatures && feature.subFeatures.length > 0 && (
                    <div className="mt-auto">
                      <div className={`w-full h-px mb-4 bg-gradient-to-r ${theme.lineGradient} to-transparent opacity-80`} />
                      <ul className="space-y-2.5 relative z-10">
                        {feature.subFeatures.map((sub: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-[13px] font-semibold text-slate-600">
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${theme.checkFill} ${theme.checkText}`} />
                            <span className="truncate">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Right Image */}
                {bgImage && (
                  <div className="absolute bottom-0 right-0 w-[140px] sm:w-[160px] h-auto z-0 pointer-events-none transform translate-x-1 translate-y-1 group-hover:scale-105 transition-transform duration-500">
                    <img src={bgImage} alt="" className="w-full h-auto object-contain mix-blend-multiply" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* And Much More Section */}
        <div className={`mt-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center mb-6 opacity-80">
            <div className="h-px bg-gradient-to-r from-transparent to-slate-200 flex-1 max-w-[300px]"></div>
            <span className="px-4 text-[11px] font-bold tracking-widest uppercase text-blue-600">And Much More</span>
            <div className="h-px bg-gradient-to-l from-transparent to-slate-200 flex-1 max-w-[300px]"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {additionalFeatures.map((item, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:border-slate-200 transition-all cursor-default">
                <item.icon className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">{item.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-transparent">
              <span className="text-xs font-medium text-slate-400">... and many more</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}