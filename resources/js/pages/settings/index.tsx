import { PageTemplate } from '@/components/page-template';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { Settings as SettingsIcon, Building, DollarSign, Users, RefreshCw, Palette, BookOpen, Award, FileText, Mail, Bell, Link2, CreditCard, Calendar, HardDrive, Shield, Bot, Cookie, Search, Webhook, Wallet, Clock, Fingerprint, Network, UserPlus, Briefcase, MailOpen, FileCheck } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import SystemSettings from './components/system-settings';
import { usePage } from '@inertiajs/react';

import CurrencySettings from './components/currency-settings';

import BrandSettings from './components/brand-settings';
import EmailSettings from './components/email-settings';
import PaymentSettings from './components/payment-settings';
import StorageSettings from './components/storage-settings';
import RecaptchaSettings from './components/recaptcha-settings';
import ChatGptSettings from './components/chatgpt-settings';
import CookieSettings from './components/cookie-settings';
import SeoSettings from './components/seo-settings';
import CacheSettings from './components/cache-settings';
import WebhookSettings from './components/webhook-settings';
import GoogleCalendarSettings from './components/google-calendar-settings';
import WorkingDaysSettings from './components/working-days-settings';
import ZektoSettings from './components/zekto-settings';
import IpRestrictionSettings from './components/ip-restriction-settings';
import NocSettings from './components/noc-settings';
import ExperienceCertificateSettings from './components/experience-certificate-settings';
import JoiningLetterSettings from './components/joining-letter-settings';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { hasPermission } from '@/utils/permissions';
import { useLayout } from '@/contexts/LayoutContext';

export default function Settings() {
  const { t } = useTranslation();
  const { position } = useLayout();

  const { systemSettings = {}, cacheSize = '0.00', timezones = {}, dateFormats = {}, timeFormats = {}, paymentSettings = {}, webhooks = [], auth = {}, globalSettings = {}, zektoSettings = {}, nocTemplates = [], joiningLetterTemplates = [], experienceCertificateTemplates = [], languages = [] } = usePage().props as any;
  const isSaas = globalSettings?.is_saas;
  const [activeSection, setActiveSection] = useState('system-settings');

  // Define all possible sidebar navigation items
  const allSidebarNavItems: (NavItem & { permission?: string })[] = [
    {
      title: t('System Settings'),
      href: '#system-settings',
      icon: <SettingsIcon className="h-4 w-4 mr-2" />,
      permission: 'manage-system-settings'
    },
    {
      title: t('Brand Settings'),
      href: '#brand-settings',
      icon: <Palette className="h-4 w-4 mr-2" />,
      permission: 'manage-brand-settings'
    },
    {
      title: t('Currency Settings'),
      href: '#currency-settings',
      icon: <DollarSign className="h-4 w-4 mr-2" />,
      permission: 'manage-currency-settings'
    },
    {
      title: t('Email Settings'),
      href: '#email-settings',
      icon: <Mail className="h-4 w-4 mr-2" />,
      permission: 'manage-email-settings'
    },
    {
      title: t('Working Days Settings'),
      href: '#working-days-settings',
      icon: <Clock className="h-4 w-4 mr-2" />,
      permission: 'manage-working-days-settings'
    },
    {
      title: t('IP Restriction Settings'),
      href: '#ip-restriction-settings',
      icon: <Network className="h-4 w-4 mr-2" />,
      permission: 'manage-ip-restriction-settings'
    },
    {
      title: t('ZKTeco Settings'),
      href: '#zekto-settings',
      icon: <Fingerprint className="h-4 w-4 mr-2" />,
      permission: 'manage-biomatric-attedance-settings'
    },
    {
      title: t('NOC Settings'),
      href: '#noc-settings',
      icon: <FileText className="h-4 w-4 mr-2" />,
      permission: 'manage-noc'
    },
    {
      title: t('Experience Certificate Settings'),
      href: '#experience-certificate-settings',
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      permission: 'manage-experience-certificate'
    },
    {
      title: t('Joining Letter Settings'),
      href: '#joining-letter-settings',
      icon: <FileCheck className="h-4 w-4 mr-2" />,
      permission: 'manage-joining-letter'
    },
    {
      title: t('Payment Settings'),
      href: '#payment-settings',
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      permission: 'manage-payment-settings'
    },
    {
      title: t('Storage Settings'),
      href: '#storage-settings',
      icon: <HardDrive className="h-4 w-4 mr-2" />,
      permission: 'manage-storage-settings'
    },
    {
      title: t('ReCaptcha Settings'),
      href: '#recaptcha-settings',
      icon: <Shield className="h-4 w-4 mr-2" />,
      permission: 'manage-recaptcha-settings'
    },
    {
      title: t('Chat GPT Settings'),
      href: '#chatgpt-settings',
      icon: <Bot className="h-4 w-4 mr-2" />,
      permission: 'manage-chatgpt-settings'
    },
    {
      title: t('Cookie Settings'),
      href: '#cookie-settings',
      icon: <Cookie className="h-4 w-4 mr-2" />,
      permission: 'manage-cookie-settings'
    },
    {
      title: t('SEO Settings'),
      href: '#seo-settings',
      icon: <Search className="h-4 w-4 mr-2" />,
      permission: 'manage-seo-settings'
    },
    {
      title: t('Cache Settings'),
      href: '#cache-settings',
      icon: <HardDrive className="h-4 w-4 mr-2" />,
      permission: 'manage-cache-settings'
    },
    // {
    //   title: t('Google Calendar Settings'),
    //   href: '#google-calendar-settings',
    //   icon: <Calendar className="h-4 w-4 mr-2" />,
    //   permission: 'settings'
    // },
  ];

  // if (auth.user?.type !== 'superadmin') {
  //   allSidebarNavItems.push({
  //     title: t('Webhook Settings'),
  //     href: '#webhook-settings',
  //     icon: <Webhook className="h-4 w-4 mr-2" />,
  //     permission: 'manage-webhook-settings'
  //   });
  // }
  // Filter sidebar items based on user permissions
  const sidebarNavItems = allSidebarNavItems.filter(item => {
    // Exclude Working Days Settings from superadmin
    if (item.permission === 'manage-working-days-settings' && auth.user?.type === 'superadmin') {
      return false;
    }
    if (item.permission === 'manage-biomatric-attedance-settings' && auth.user?.type === 'superadmin') {
      return false;
    }
    if (item.permission === 'manage-ip-restriction-settings' && auth.user?.type === 'superadmin') {
      return false;
    }
    // Exclude NOC Settings from superadmin
    if (item.permission === 'manage-noc' && auth.user?.type === 'superadmin') {
      return false;
    }
    // Exclude Experience Certificate Settings from superadmin
    if (item.permission === 'manage-experience-certificate' && auth.user?.type === 'superadmin') {
      return false;
    }
    // Exclude Joining Letter Settings from superadmin
    if (item.permission === 'manage-joining-letter' && auth.user?.type === 'superadmin') {
      return false;
    }
    // If no permission is required or user has the permission
    if (!item.permission || (auth.permissions && auth.permissions.includes(item.permission))) {
      return true;
    }
    // For company users, show different settings based on SaaS mode
    if (auth.user && auth.user.type === 'company') {
      // In non-SaaS mode, allow additional settings
      const allowedPermissions = ['manage-system-settings', 'manage-email-settings', 'manage-currency-settings', 'manage-brand-settings', 'manage-webhook-settings', 'manage-working-days-settings', 'manage-biomatric-attedance-settings', 'manage-ip-restriction-settings', 'settings'];
      if (!isSaas) {
        allowedPermissions.push('manage-storage-settings', 'manage-recaptcha-settings', 'manage-chatgpt-settings', 'manage-cookie-settings', 'manage-seo-settings', 'manage-cache-settings', 'manage-working-days-settings', 'manage-biomatric-attedance-settings', 'manage-ip-restriction-settings');
      }
      return allowedPermissions.includes(item.permission);
    }
    return false;
  });

  // Refs for each section
  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveSection(id);
  };

  return (
    <PageTemplate
      title={t('Settings')}
      url="/settings"
      breadcrumbs={[
        { title: t('Dashboard'), href: route('dashboard') },
        { title: t('Settings') }
      ]}
    >
      <div className={`flex flex-col md:flex-row gap-8`} dir={position === 'right' ? 'rtl' : 'ltr'}>
        {/* <div className={`flex flex-col md:flex-row gap-8 ${position === 'rtl' ? 'md:flex-row-reverse' : ''}`}> */}
        {/* Sidebar Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <div className={`space-y-1 ${position === 'rtl' ? 'pl-4' : 'pr-4'}`}>
                {sidebarNavItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn('w-full justify-start', {
                      'bg-muted font-medium': activeSection === item.href.replace('#', ''),
                    })}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* System Settings Section */}
          {activeSection === 'system-settings' && (auth.permissions?.includes('manage-system-settings') || auth.user?.type === 'superadmin' || auth.user?.type === 'company') && (
            <section id="system-settings" className="mb-8">
              <SystemSettings
                settings={systemSettings}
                timezones={timezones}
                dateFormats={dateFormats}
                timeFormats={timeFormats}
                isCompanyUser={auth.user?.type === 'company'}
              />
            </section>
          )}

          {/* Brand Settings Section */}
          {activeSection === 'brand-settings' && (auth.permissions?.includes('manage-brand-settings') || auth.user?.type === 'superadmin') && (
            <section id="brand-settings" className="mb-8">
              <BrandSettings settings={systemSettings} />
            </section>
          )}



          {/* Currency Settings Section */}
          {activeSection === 'currency-settings' && (auth.permissions?.includes('manage-currency-settings') || auth.user?.type === 'superadmin' || auth.user?.type === 'company') && (
            <section id="currency-settings" className="mb-8">
              <CurrencySettings />
            </section>
          )}

          {/* Email Settings Section */}
          {activeSection === 'email-settings' && (auth.permissions?.includes('manage-email-settings') || auth.user?.type === 'superadmin') && (
            <section id="email-settings" className="mb-8">
              <EmailSettings />
            </section>
          )}

          {/* Working Days Settings Section */}
          {activeSection === 'working-days-settings' && auth.user?.type !== 'superadmin' && (auth.permissions?.includes('manage-working-days-settings') || auth.user?.type === 'company') && (
            <section id="working-days-settings" className="mb-8">
              <WorkingDaysSettings settings={systemSettings} />
            </section>
          )}

          {/* IP Restriction Settings Section */}
          {activeSection === 'ip-restriction-settings' && auth.user?.type === 'company' && (auth.permissions?.includes('manage-ip-restriction-settings')) && (
            <section id="ip-restriction-settings" className="mb-8">
              <IpRestrictionSettings />
            </section>
          )}

          {/* Zekto Settings Section */}
          {activeSection === 'zekto-settings' && auth.user?.type === 'company' && (auth.permissions?.includes('manage-biomatric-attedance-settings')) && (
            <section id="zekto-settings" className="mb-8">
              <ZektoSettings settings={zektoSettings} />
            </section>
          )}

           {/* NOC Settings Section */}
          {activeSection === 'noc-settings' && auth.user?.type === 'company' && (auth.permissions?.includes('manage-noc')) && (
            <section id="noc-settings" className="mb-8">
              <NocSettings templates={nocTemplates} />
            </section>
          )}

          {/* Experience Certificate Settings Section */}
          {activeSection === 'experience-certificate-settings' && auth.user?.type === 'company' && (auth.permissions?.includes('manage-experience-certificate')) && (
            <section id="experience-certificate-settings" className="mb-8">
              <ExperienceCertificateSettings templates={experienceCertificateTemplates} />
            </section>
          )}

          {/* Joining Letter Settings Section */}
          {activeSection === 'joining-letter-settings' && auth.user?.type === 'company' && (auth.permissions?.includes('manage-joining-letter')) && (
            <section id="joining-letter-settings" className="mb-8">
              <JoiningLetterSettings templates={joiningLetterTemplates} />
            </section>
          )}


          {/* Payment Settings Section */}
          {activeSection === 'payment-settings' && (auth.permissions?.includes('manage-payment-settings') || auth.user?.type === 'superadmin') && (
            <section id="payment-settings" className="mb-8">
              <PaymentSettings settings={paymentSettings} />
            </section>
          )}

          {/* Storage Settings Section */}
          {activeSection === 'storage-settings' && (auth.permissions?.includes('manage-settings') && (auth.user?.type === 'superadmin' || (auth.user?.type === 'company' && !isSaas))) && (
            <section id="storage-settings" className="mb-8">
              <StorageSettings settings={systemSettings} />
            </section>
          )}

          {/* ReCaptcha Settings Section */}
          {activeSection === 'recaptcha-settings' && (auth.permissions?.includes('manage-recaptcha-settings') || auth.user?.type === 'superadmin' || (auth.user?.type === 'company' && !isSaas)) && (
            <section id="recaptcha-settings" className="mb-8">
              <RecaptchaSettings settings={systemSettings} />
            </section>
          )}

          {/* Chat GPT Settings Section */}
          {activeSection === 'chatgpt-settings' && (auth.permissions?.includes('manage-chatgpt-settings') || auth.user?.type === 'superadmin' || (auth.user?.type === 'company' && !isSaas)) && (
            <section id="chatgpt-settings" className="mb-8">
              <ChatGptSettings settings={systemSettings} />
            </section>
          )}

          {/* Cookie Settings Section */}
          {activeSection === 'cookie-settings' && (auth.permissions?.includes('manage-cookie-settings') || auth.user?.type === 'superadmin' || (auth.user?.type === 'company' && !isSaas)) && (
            <section id="cookie-settings" className="mb-8">
              <CookieSettings settings={systemSettings} />
            </section>
          )}

          {/* SEO Settings Section */}
          {activeSection === 'seo-settings' && (auth.permissions?.includes('manage-seo-settings') || auth.user?.type === 'superadmin' || (auth.user?.type === 'company' && !isSaas)) && (
            <section id="seo-settings" className="mb-8">
              <SeoSettings settings={systemSettings} />
            </section>
          )}

          {/* Cache Settings Section */}
          {activeSection === 'cache-settings' && (auth.permissions?.includes('manage-cache-settings') || auth.user?.type === 'superadmin' || (auth.user?.type === 'company' && !isSaas)) && (
            <section id="cache-settings" className="mb-8">
              <CacheSettings cacheSize={cacheSize} />
            </section>
          )}

          {/* Google Calendar Settings Section */}
          {/* {activeSection === 'google-calendar-settings' && (auth.permissions?.includes('settings') || auth.user?.type === 'company') && (
            <section id="google-calendar-settings" className="mb-8">
              <GoogleCalendarSettings settings={systemSettings} />
            </section>
          )} */}

         
          {/* Webhook Settings Section */}
          {/* {activeSection === 'webhook-settings' && (auth.permissions?.includes('manage-webhook-settings') && auth.user?.type !== 'superadmin') && (
            <section id="webhook-settings" className="mb-8">
              <WebhookSettings webhooks={webhooks} />
            </section>
          )} */}

        </div>
      </div>
      <Toaster />
    </PageTemplate>
  );
}