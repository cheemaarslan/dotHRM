import { PageTemplate } from '@/components/page-template';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { BarChart3, DollarSign, Users, Gift, Settings as SettingsIcon, Copy, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import ReferralDashboard from './components/referral-dashboard';
import PayoutRequests from './components/payout-requests';
import ReferralSettings from './components/referral-settings';
import ReferredUsersSection from './components/referred-users-section';

export default function Referral() {
  const { t } = useTranslation();
  const { props } = usePage();
  const { userType, settings, stats, payoutRequests, referralLink, currencySymbol, globalSettings } = props as any;
  const [activeSection, setActiveSection] = useState('dashboard');
  
   const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Referral Program') }
  ]
  const sidebarNavItems: NavItem[] = [
    {
      title: t('Dashboard'),
      href: '#dashboard',
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
    },
    {
      title: t('Referred Users'),
      href: '#referred-users',
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      title: t('Payout Requests'),
      href: '#payout-requests',
      icon: <DollarSign className="h-4 w-4 mr-2" />,
    },
    ...(userType === 'superadmin' ? [{
      title: t('Settings'),
      href: '#settings',
      icon: <SettingsIcon className="h-4 w-4 mr-2" />,
    }] : [])
  ];
  
  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveSection(id);
  };

  return (
    <PageTemplate 
    breadcrumbs={breadcrumbs}
      title={t('Referral Program')} 
      url="/referral"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <div className="pr-4 space-y-1">
                {sidebarNavItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn('w-full justify-start text-sm', {
                      'bg-muted font-semibold': activeSection === item.href.replace('#', ''),
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

        <div className="flex-1">
          {activeSection === 'dashboard' && (
            <section id="dashboard" className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('Dashboard')}</h2>
              <ReferralDashboard 
                userType={userType}
                stats={stats}
                referralLink={referralLink}
                recentReferredUsers={props.recentReferredUsers}
                currencySymbol={currencySymbol}
              />
            </section>
          )}

          {activeSection === 'referred-users' && (
            <section id="referred-users" className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('Referred Users')}</h2>
              <ReferredUsersSection 
                referredUsers={props.referredUsers}
                userType={userType}
                currencySymbol={currencySymbol}
              />
            </section>
          )}

          {activeSection === 'payout-requests' && (
            <section id="payout-requests" className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('Payout Requests')}</h2>
              <PayoutRequests 
                userType={userType}
                payoutRequests={payoutRequests}
                settings={settings}
                stats={stats}
                currencySymbol={currencySymbol}
              />
            </section>
          )}

          {activeSection === 'settings' && userType === 'superadmin' && (
            <section id="settings" className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('Settings')}</h2>
              <ReferralSettings settings={settings} currencySymbol={currencySymbol} globalSettings={globalSettings} />
            </section>
          )}
        </div>
      </div>
      <Toaster />
    </PageTemplate>
  );
}