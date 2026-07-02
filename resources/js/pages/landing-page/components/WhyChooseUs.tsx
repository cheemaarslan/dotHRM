import React from 'react';
import { 
  Star, 
  Clock, 
  Users, 
  Shield, 
  BarChart, 
  Box, 
  Cloud, 
  Smile, 
  Rocket,
  ArrowRight 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

interface WhyChooseUsProps {
  brandColor?: string;
  settings: any;
  sectionData?: any;
}

export default function WhyChooseUs({ settings, sectionData, brandColor = '#3b82f6' }: WhyChooseUsProps) {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const reasons = [
    {
      icon: Clock,
      title: t('Save Time'),
      description: t('Automate repetitive HR tasks and reduce administrative workload.'),
      color: 'blue'
    },
    {
      icon: Shield,
      title: t('Improve Accuracy'),
      description: t('Eliminate payroll errors and manual data entry mistakes.'),
      color: 'green'
    },
    {
      icon: Users,
      title: t('Better Employee Experience'),
      description: t('Empower employees through self-service tools and mobile access.'),
      color: 'purple'
    },
    {
      icon: BarChart,
      title: t('Real-Time Insights'),
      description: t('Keep sensitive HR data safe with enterprise-grade security.'),
      color: 'orange'
    }
  ];

  const getReasonColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50', iconText: 'text-blue-600', border: 'border-blue-600' };
      case 'green': return { bg: 'bg-green-50', iconText: 'text-green-500', border: 'border-green-500' };
      case 'purple': return { bg: 'bg-purple-50', iconText: 'text-purple-500', border: 'border-purple-500' };
      case 'orange': return { bg: 'bg-orange-50', iconText: 'text-orange-500', border: 'border-orange-400' };
      default: return { bg: 'bg-blue-50', iconText: 'text-blue-600', border: 'border-blue-600' };
    }
  };

  const stats = [
    {
      icon: Box,
      value: '10+',
      title: 'Integrated HR Modules',
      description: 'All-in-one management',
      color: 'blue'
    },
    {
      icon: Cloud,
      value: '100%',
      title: 'Cloud-Based',
      description: 'Secure & Accessible',
      color: 'green'
    },
    {
      icon: Smile,
      value: '98%',
      title: 'Customer Satisfaction',
      description: 'Loved by HR professionals',
      color: 'purple'
    },
    {
      icon: Rocket,
      value: 'Unlimited',
      title: 'Workforce Growth',
      description: 'Scale without limits',
      color: 'orange'
    }
  ];

  const getStatColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50', iconText: 'text-blue-600', valueText: 'text-blue-600' };
      case 'green': return { bg: 'bg-green-50', iconText: 'text-green-500', valueText: 'text-green-500' };
      case 'purple': return { bg: 'bg-purple-50', iconText: 'text-purple-600', valueText: 'text-purple-600' };
      case 'orange': return { bg: 'bg-orange-50', iconText: 'text-orange-500', valueText: 'text-orange-500' };
      default: return { bg: 'bg-blue-50', iconText: 'text-blue-600', valueText: 'text-blue-600' };
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden min-h-screen flex items-center" ref={ref}>
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4">
              <div className="bg-blue-600 text-white p-0.5 rounded-full">
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span>WHY CHOOSE DOTHRM</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-[1.1] tracking-tight">
              Built for HR Teams.<br />
              Designed for <span className="text-blue-600">Impact.</span>
            </h2>
            
            <p className="text-base text-gray-500 mb-6 leading-relaxed max-w-[420px]">
              dotHRM brings everything your HR team needs into one powerful platform—so you can save time, reduce errors, and focus on what truly matters.
            </p>

            <div className="space-y-3">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                const colors = getReasonColorClasses(reason.color);
                return (
                  <div key={index} className={`flex items-center justify-between bg-white rounded-2xl p-3 sm:px-4 sm:py-3 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border-l-[6px] ${colors.border}`}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                        <Icon className={`w-5 h-5 ${colors.iconText}`} />
                      </div>
                      <div>
                        <h3 className="text-[15px] sm:text-base font-bold text-gray-900 mb-0.5">
                          {reason.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed pr-2">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mr-1">
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Light Card */}
          <div className={`bg-[#f8fafc] rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            
            <div className="relative z-10 flex flex-col items-center text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight max-w-[400px] mx-auto">
                Everything Your HR Team Needs in One Platform
              </h3>
              <div className="w-10 h-[3px] bg-blue-600 mb-4 rounded-full"></div>
              <p className="text-gray-500 text-[13px] sm:text-sm">
                Join thousands of organizations growing with dotHRM.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const colors = getStatColorClasses(stat.color);
                return (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-start gap-3 h-full">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                      <Icon className={`w-5 h-5 ${colors.iconText}`} />
                    </div>
                    <div>
                      <div className={`text-xl sm:text-2xl font-bold mb-1 leading-none ${colors.valueText}`}>{stat.value}</div>
                      <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{stat.title}</div>
                      <div className="text-xs text-gray-500 leading-snug">{stat.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Banner */}
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 pl-3 flex items-center justify-between relative z-10 shadow-[0_4px_25px_rgb(0,0,0,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=1" alt="User 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=8" alt="User 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=3" alt="User 3" className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-xs text-gray-800 font-medium hidden sm:block leading-tight">
                  Trusted by 10,000+ companies<br/>worldwide
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
