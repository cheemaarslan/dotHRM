import React, { useState } from 'react';
import { PageTemplate } from '@/components/page-template';
import { RefreshCw, BarChart3, Nfc, Building2, CreditCard, Ticket, DollarSign, TrendingUp, Activity, UserPlus, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { SuperAdminCharts } from '@/components/dashboard/superadmin-charts';
import { SparklineStatCard } from '@/components/dashboard/sparkline-stat-card';
import { router } from '@inertiajs/react';

interface SuperAdminDashboardData {
  stats: {
    totalCompanies: number;
    totalUsers: number;
    totalNfcCards: number;
    totalRevenue: number;
    activePlans: number;
    pendingRequests: number;
    monthlyGrowth: number;
    activeCoupons: number;
  };
  recentActivity: Array<{
    id: number;
    name: string;
    email: string;
    registered_at: string;
    status: string;
  }>;
  topPlans: Array<{
    name: string;
    subscribers: number;
    revenue: number;
  }>;
  chartData?: Array<{
    name: string;
    revenue: number;
    companies: number;
  }>;
}

interface PageAction {
  label: string;
  icon: React.ReactNode;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick: () => void;
}

export default function SuperAdminDashboard({ dashboardData }: { dashboardData: SuperAdminDashboardData }) {
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);


  const handleRefresh = () => {
    setIsRefreshing(true);
    router.reload({ only: ['dashboardData'] });
    setTimeout(() => setIsRefreshing(false), 1000);
  };





  const pageActions: PageAction[] = [
    {
      label: t('Refresh'),
      icon: <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />,
      variant: 'outline',
      onClick: handleRefresh
    }
  ];

  const stats = dashboardData?.stats || {
    totalCompanies: 156,
    totalNfcCards: 89,
    totalRevenue: 45678,
    activePlans: 89,
    pendingRequests: 12,
    monthlyGrowth: 15.2
  };

  const recentActivity = dashboardData?.recentActivity || [];

  const topPlans = dashboardData?.topPlans || [
    { name: 'Professional', subscribers: 45, revenue: 13500 },
    { name: 'Business', subscribers: 32, revenue: 9600 },
    { name: 'Enterprise', subscribers: 12, revenue: 7200 },
  ];

  // Generate some realistic-looking mock data for the 7-day sparklines
  const generateMockSparkline = (base: number, variance: number, trend: 'up' | 'down' | 'mixed') => {
    let current = base;
    return Array.from({ length: 7 }).map((_, i) => {
      const change = (Math.random() - (trend === 'up' ? 0.3 : trend === 'down' ? 0.7 : 0.5)) * variance;
      current += change;
      return { value: Math.max(0, current) };
    });
  };

  const sparklineData = {
    plans: generateMockSparkline(stats.activePlans * 0.8, stats.activePlans * 0.05, 'up'),
    requests: generateMockSparkline(stats.pendingRequests * 1.5, stats.pendingRequests * 0.2, 'down'),
    companies: generateMockSparkline(stats.totalCompanies * 0.9, stats.totalCompanies * 0.02, 'up'),
    users: generateMockSparkline(stats.totalUsers * 0.85, stats.totalUsers * 0.05, 'mixed'),
    revenue: generateMockSparkline(stats.totalRevenue * 0.8, stats.totalRevenue * 0.1, 'up'),
    coupons: generateMockSparkline(stats.activeCoupons * 0.9, stats.activeCoupons * 0.03, 'up'),
  };

  return (
    <PageTemplate 
      title={t('Dashboard')}
      url="/dashboard"
      actions={pageActions}
      breadcrumbs={[{ title: t('Dashboard'), href: '/dashboard' }]}
    >
      <div className="flex flex-col gap-6">
        
        {/* Top Stats Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <SparklineStatCard
            title={t('Active Plans')}
            value={stats.activePlans.toLocaleString()}
            percentage={12.4}
            theme="blue"
            data={sparklineData.plans}
          />
          <SparklineStatCard
            title={t('Pending Requests')}
            value={stats.pendingRequests.toLocaleString()}
            percentage={-5.2}
            theme="yellow"
            data={sparklineData.requests}
          />
          <SparklineStatCard
            title={t('Total Companies')}
            value={stats.totalCompanies.toLocaleString()}
            percentage={8.7}
            theme="cyan"
            data={sparklineData.companies}
          />
          <SparklineStatCard
            title={t('Total Users')}
            value={stats.totalUsers?.toLocaleString() || 0}
            percentage={3.1}
            theme="emerald"
            data={sparklineData.users}
          />
          <SparklineStatCard
            title={t('Total Revenue')}
            value={window.appSettings?.formatCurrency ? window.appSettings.formatCurrency(stats.totalRevenue) : `$${stats.totalRevenue.toLocaleString()}`}
            percentage={15.8}
            theme="blue"
            data={sparklineData.revenue}
          />
          <SparklineStatCard
            title={t('Active Coupons')}
            value={stats.activeCoupons?.toLocaleString() || 0}
            percentage={4.5}
            theme="yellow"
            data={sparklineData.coupons}
          />
        </div>

        {/* Charts Section */}
        <SuperAdminCharts data={dashboardData.chartData || []} stats={stats} />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Building2 className="h-4 w-4 flex-shrink-0" />
                {t('Recently Registered Companies')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((company) => (
                    <div key={company.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{company.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{company.email}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-muted-foreground">{company.registered_at}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">{t('No companies registered yet')}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Plans */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Ticket className="h-4 w-4 flex-shrink-0" />
                {t('Top Performing Plans')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPlans.map((plan, index) => (
                  <div key={plan.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">{plan.subscribers} {t('subscribers')}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold">${plan.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{t('revenue')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Overview */}
        <DashboardOverview userType="superadmin" stats={stats} />
      </div>
    </PageTemplate>
  );
}