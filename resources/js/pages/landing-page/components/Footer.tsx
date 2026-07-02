import React from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ShieldCheck, Lock, Cloud, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/custom-toast';

interface FooterProps {
  brandColor?: string;
  settings: {
    company_name: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    footerText?: string;
  };
  sectionData?: {
    description?: string;
    newsletter_title?: string;
    newsletter_subtitle?: string;
    links?: any;
    social_links?: Array<{
      name: string;
      icon: string;
      href: string;
    }>;
    section_titles?: {
      product: string;
      company: string;
      support: string;
      legal: string;
    };
  };
}

export default function Footer({ settings, sectionData = {}, brandColor = '#4f46e5' }: FooterProps) {
  const { t } = useTranslation();
  const { globalSettings } = usePage().props as any;
  const currentYear = new Date().getFullYear();

  const { data, setData, post, processing, errors, reset } = useForm({
    email: ''
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
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

  const footerLinks = sectionData.links || {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Security', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'News & Press', href: '#' },
      { name: 'Partner Program', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Guides & Tutorials', href: '#' },
      { name: 'System Status', href: '#' },
      { name: 'Contact Support', href: '#' }
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Refund Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Data Processing', href: '#' }
    ]
  };

  return (
    <footer className="bg-[#0b1120] text-gray-300 font-sans relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column (Logo, Text, Contact, Socials) */}
          <div className="lg:col-span-4 lg:pr-8">
            {/* Logo and Subtitle */}
            <div className="mb-6">
               <Link href="/" className="block hover:opacity-90 transition-opacity">
                 <div className="flex items-center gap-[2px] mb-1">
                   <div className="text-[40px] font-bold text-indigo-500 leading-none tracking-tighter">.d</div>
                   <div className="text-[32px] font-bold text-white leading-none tracking-tight">dotHRM</div>
                 </div>
                 <p className="text-[13px] text-gray-500 font-medium ml-1">Smart HR & Payroll Management</p>
               </Link>
            </div>
            
            {/* Description */}
            <p className="text-[15px] leading-relaxed text-gray-400 mb-8 max-w-sm">
              {sectionData.description || "dotHRM is a cloud-based HR and Payroll software that helps businesses manage employees, attendance, leave, payroll, recruitment, and workforce operations from one platform."}
            </p>
            
            {/* Blue Dash */}
            <div className="w-8 h-[3px] bg-indigo-600 rounded-full mb-8"></div>
            
            {/* Contact Details */}
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[15px] text-gray-300 hover:text-white transition-colors cursor-pointer">{settings.contact_email || 'support@dothrm.com'}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[15px] text-gray-300">{settings.contact_phone || '+1 (555) 123-4567'}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[15px] text-gray-300 max-w-[200px] leading-snug">{settings.contact_address || 'Dubai Silicon Oasis, Dubai, UAE'}</span>
              </div>
            </div>
            
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4 text-gray-400" fill="currentColor" strokeWidth={0.5} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4 text-gray-400" fill="currentColor" strokeWidth={0.5} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4 text-gray-400" fill="currentColor" strokeWidth={0.5} />
              </a>
            </div>
          </div>
          
          {/* Right Column (Links + Newsletter) */}
          <div className="lg:col-span-8 flex flex-col h-full">
            
            {/* Top: Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* PRODUCT */}
              <div>
                <h3 className="text-white font-bold tracking-wide text-sm mb-2">{sectionData.section_titles?.product || 'PRODUCT'}</h3>
                <div className="w-6 h-[2px] bg-indigo-600 mb-6"></div>
                <ul className="space-y-4">
                  {(footerLinks.product || []).map((link: any) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-[15px] text-gray-400 hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* COMPANY */}
              <div>
                <h3 className="text-white font-bold tracking-wide text-sm mb-2">{sectionData.section_titles?.company || 'COMPANY'}</h3>
                <div className="w-6 h-[2px] bg-indigo-600 mb-6"></div>
                <ul className="space-y-4">
                  {(footerLinks.company || []).map((link: any) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-[15px] text-gray-400 hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* SUPPORT */}
              <div>
                <h3 className="text-white font-bold tracking-wide text-sm mb-2">{sectionData.section_titles?.support || 'SUPPORT'}</h3>
                <div className="w-6 h-[2px] bg-indigo-600 mb-6"></div>
                <ul className="space-y-4">
                  {(footerLinks.support || []).map((link: any) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-[15px] text-gray-400 hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* LEGAL */}
              <div>
                <h3 className="text-white font-bold tracking-wide text-sm mb-2">{sectionData.section_titles?.legal || 'LEGAL'}</h3>
                <div className="w-6 h-[2px] bg-indigo-600 mb-6"></div>
                <ul className="space-y-4">
                  {(footerLinks.legal || []).map((link: any) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-[15px] text-gray-400 hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Bottom: Newsletter Card */}
            <div className="mt-auto rounded-[24px] p-8 lg:p-10 border border-white/5 bg-gradient-to-br from-[#1e1b4b]/60 via-[#0f172a] to-[#1e3a8a]/20 relative overflow-hidden flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 shadow-[0_0_50px_rgba(79,70,229,0.05)]">
              
              {/* Left: Text & Icon */}
              <div className="flex items-start gap-6 z-10 w-full xl:w-auto">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    {sectionData.newsletter_title || t('Stay Updated')}
                  </h3>
                  <p className="text-sm lg:text-[15px] text-gray-400 max-w-xs leading-relaxed">
                    {sectionData.newsletter_subtitle || t('Get the latest updates, HR tips, and feature announcements.')}
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="w-full xl:w-auto z-10">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 mb-4 relative">
                  
                  {/* Decorative Dotted Path and Plane positioned relative to the form/button */}
                  <div className="absolute -top-6 -right-5 hidden sm:block pointer-events-none z-0">
                    
                    <img 
                      src="/images/default/Aeroplan.png" 
                      alt="Aeroplan" 
                      className="w-12 h-12 absolute top-[-18px] right-[-20px] drop-shadow-lg transform -rotate-[15deg] object-contain" 
                    />
                  </div>

                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder={t('Enter your email address')}
                    className="relative z-10 w-full sm:w-[260px] px-5 py-3.5 bg-[#0f172a]/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none text-[14px] transition-all"
                    required
                    disabled={processing}
                  />
                  <button
                    type="submit"
                    disabled={processing}
                    className="relative z-10 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity whitespace-nowrap text-[14px] disabled:opacity-50 flex justify-center items-center"
                  >
                    {processing && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    {t('Subscribe')}
                  </button>
                </form>
                <div className="flex items-center justify-start sm:justify-end gap-2 text-[13px] text-gray-500 xl:pr-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t('No spam, unsubscribe at any time.')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[13px] text-gray-500 font-medium">
            {globalSettings?.footerText || `© ${currentYear} dotHRM. ${t('All rights reserved.')}`}
          </div>
          <div className="flex items-center gap-6 text-[13px] text-gray-400 font-medium">
            <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-gray-500"/> {t('Enterprise Grade Security')}</div>
            <div className="hidden md:block w-px h-3 bg-gray-700/50"></div>
            <div className="flex items-center gap-2"><Cloud className="w-4 h-4 text-gray-500"/> {t('99.9% Uptime')}</div>
            <div className="hidden md:block w-px h-3 bg-gray-700/50"></div>
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-500"/> {t('Worldwide Access')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}