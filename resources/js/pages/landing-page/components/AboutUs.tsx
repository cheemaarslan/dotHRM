import React from 'react';
import { Lightbulb, Star, Users, Zap, Rocket, Globe, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

interface AboutUsProps {
  brandColor?: string;
  settings: any;
  sectionData: any;
}

export default function AboutUs({ settings, sectionData, brandColor = '#3b82f6' }: AboutUsProps) {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#fafbfc] relative overflow-hidden" ref={ref}>
      {/* Top Background Blob */}
      <div className="absolute top-0 right-0 -translate-y-24 translate-x-1/3 w-[800px] h-[800px] bg-blue-50/70 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Section */}
        <div className={`text-center mb-10 lg:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wide mb-4 border border-blue-100/50">
            <Globe className="w-3.5 h-3.5" />
            {t('ABOUT DOTHRM')}
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-4 tracking-tight leading-[1.15]">
            {t('Empowering Businesses.')}<br />
            {t('Elevating')} <span className="text-blue-600">{t('People.')}</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            {t("dotHRM is more than just software — it's a complete HR ecosystem built to help organizations streamline operations, empower teams, and drive meaningful growth.")}
          </p>
        </div>

        {/* Story & Image Section */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Text Content */}
          <div className="order-2 lg:order-1 pr-0 lg:pr-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-4 leading-tight tracking-tight">
              {t('Smarter HR for a')}<br />{t('Better Tomorrow')}
            </h3>
            <p className="text-gray-500 mb-4 leading-relaxed text-sm lg:text-base">
              {t('We built dotHRM to solve the complex, repetitive, and time-consuming HR challenges that slow businesses down. Our mission is to simplify workforce management so you can focus on what matters most — your people.')}
            </p>
            <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
              {t('From HR and payroll to performance and analytics, dotHRM brings everything together in one intelligent platform that grows with your organization.')}
            </p>
          </div>
          
          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-visible">
              
              {/* Decorative dotted pattern background */}
              <div className="absolute -top-8 -right-10 w-48 h-48 -z-10 opacity-60 hidden lg:block">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#cbd5e1" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
                </svg>
              </div>

              <img 
                src="/images/default/dashboard-cover.png" 
                alt="dotHRM Dashboard" 
                className="w-full h-auto rounded-xl shadow-2xl relative z-10 border border-gray-100"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-4 lg:-bottom-6 left-4 lg:-left-6 bg-white pl-4 pr-6 py-3 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20 border border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30">
                  <Rocket className="w-5 h-5" fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0f172a] text-[15px]">{t('Innovation Driven')}</h4>
                  <p className="text-[13px] text-gray-500 leading-tight mt-0.5">{t('Building the future of')}<br/>{t('workforce management.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={`grid md:grid-cols-3 gap-4 mb-12 lg:mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Stat 1 */}
          <div className="bg-white rounded-[1.25rem] p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center shrink-0 text-blue-600">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0f172a] mb-0.5">100%</div>
              <div className="font-bold text-[#0f172a] text-[13px] mb-1">{t('Innovation')}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{t('Continuously pushing boundaries.')}</div>
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="bg-white rounded-[1.25rem] p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] flex items-center justify-center shrink-0 text-green-600">
              <Zap className="w-5 h-5" fill="currentColor" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0f172a] mb-0.5">20+</div>
              <div className="font-bold text-[#0f172a] text-[13px] mb-1">{t('Companies Served')}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{t('Trusted by growing businesses worldwide.')}</div>
            </div>
          </div>
          
          {/* Stat 3 */}
          <div className="bg-white rounded-[1.25rem] p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#fff7ed] flex items-center justify-center shrink-0 text-orange-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#0f172a] mb-0.5">8K+</div>
              <div className="font-bold text-[#0f172a] text-[13px] mb-1">{t('Employees Managed')}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{t('Empowering teams to do their best work.')}</div>
            </div>
          </div>
        </div>

        {/* Foundation Section */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-2">{t('Our Foundation. Your Success.')}</h3>
            <p className="text-gray-500 text-sm lg:text-base">{t('The principles that guide everything we do at dotHRM.')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Vision */}
            <div className="bg-white rounded-[1.25rem] p-5 lg:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center mb-4 text-blue-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0f172a] mb-2">{t('Our Vision')}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-grow">
                {t('To empower businesses with modern HR technology that drives efficiency, growth, and workforce excellence.')}
              </p>
              <div className="w-6 h-1 bg-blue-600 rounded-full mt-auto transition-all group-hover:w-12"></div>
            </div>
            
            {/* Mission */}
            <div className="bg-white rounded-[1.25rem] p-5 lg:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-4 text-green-600">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0f172a] mb-2">{t('Our Mission')}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-grow">
                {t('To simplify HR and payroll management through intelligent, user-friendly software that enhances productivity and employee experiences.')}
              </p>
              <div className="w-6 h-1 bg-green-500 rounded-full mt-auto transition-all group-hover:w-12"></div>
            </div>
            
            {/* Values */}
            <div className="bg-white rounded-[1.25rem] p-5 lg:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-10 h-10 rounded-full bg-[#f5f3ff] flex items-center justify-center mb-4 text-purple-600">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0f172a] mb-2">{t('Our Values')}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-grow">
                {t('We are committed to innovation, reliability, transparency, and customer success in everything we build.')}
              </p>
              <div className="w-6 h-1 bg-purple-600 rounded-full mt-auto transition-all group-hover:w-12"></div>
            </div>
            
            {/* Promise */}
            <div className="bg-white rounded-[1.25rem] p-5 lg:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="w-10 h-10 rounded-full bg-[#fff7ed] flex items-center justify-center mb-4 text-orange-500">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#0f172a] mb-2">{t('Our Promise')}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-grow">
                {t('To deliver secure, scalable, and easy-to-use HR solutions that help organizations manage their people with confidence.')}
              </p>
              <div className="w-6 h-1 bg-orange-500 rounded-full mt-auto transition-all group-hover:w-12"></div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

