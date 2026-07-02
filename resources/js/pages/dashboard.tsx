import React, { useState } from 'react';
import { PageTemplate } from '@/components/page-template';
import { RefreshCw, Users, Building2, Briefcase, UserPlus, Calendar, Clock, TrendingUp, BarChart3, Bell, ExternalLink, Copy, CheckCircle, PieChart as PieChartIcon, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { hasPermission } from '@/utils/authorization';

interface CompanyDashboardData {
  stats: {
    totalEmployees: number;
    totalBranches: number;
    totalDepartments: number;
    newEmployeesThisMonth: number;
    jobPostsThisMonth: number;
    candidatesThisMonth: number;
    attendanceRate: number;
    presentToday: number;
    pendingLeaves: number;
    onLeaveToday: number;
    activeJobPostings: number;
    totalCandidates: number;
  };
  charts: {
    departmentStats: Array<{name: string; value: number; color: string}>;
    hiringTrend: Array<{month: string; hires: number}>;
    candidateStatusStats: Array<{name: string; value: number; color: string}>;
    leaveTypesStats: Array<{name: string; value: number; color: string}>;
    employeeGrowthChart: Array<{month: string; employees: number}>;
  };
  recentActivities: {
    leaves: Array<any>;
    candidates: Array<any>;
    announcements: Array<any>;
    meetings: Array<any>;
  };
  userType: string;
}

interface PageAction {
  label: string;
  icon: React.ReactNode;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick: () => void;
}

export default function Dashboard({ dashboardData }: { dashboardData: CompanyDashboardData }) {
  const { t } = useTranslation();
  const { auth, companySlug } = usePage().props as any;
  const [copied, setCopied] = useState(false);

  const handleCopyCareerLink = () => {
    const careerUrl = companySlug ? 
      route('career.index', companySlug) : 
      route('career.index');
    navigator.clipboard.writeText(careerUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openCareerPage = () => {
    const careerUrl = companySlug ? 
      route('career.index', companySlug) : 
      route('career.index');
    window.open(careerUrl, '_blank');
  };

  const pageActions: PageAction[] = [
    {
      label: t('Refresh'),
      icon: <RefreshCw className="h-4 w-4" />,
      variant: 'outline',
      onClick: () => window.location.reload()
    }
  ];

  const stats = dashboardData?.stats || {
    totalEmployees: 0,
    totalBranches: 0,
    totalDepartments: 0,
    newEmployeesThisMonth: 0,
    jobPostsThisMonth: 0,
    candidatesThisMonth: 0,
    attendanceRate: 0,
    presentToday: 0,
    pendingLeaves: 0,
    onLeaveToday: 0,
    activeJobPostings: 0,
    totalCandidates: 0
  };

  const charts = dashboardData?.charts || {
    departmentStats: [],
    hiringTrend: [],
    candidateStatusStats: [],
    leaveTypesStats: [],
    employeeGrowthChart: []
  };



  const recentActivities = dashboardData?.recentActivities || {
    leaves: [],
    candidates: [],
    announcements: [],
    meetings: []
  };

  const userType = dashboardData?.userType || 'employee';
  const isCompanyUser = userType === 'company';
  
  const getStatusColor = (status: string) => {
    const colors = {
      'approved': 'bg-green-50 text-green-700 ring-green-600/20',
      'pending': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
      'rejected': 'bg-red-50 text-red-700 ring-red-600/20',
      'New': 'bg-blue-50 text-blue-700 ring-blue-600/20',
      'Screening': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
      'Interview': 'bg-purple-50 text-purple-700 ring-purple-600/20',
      'Offer': 'bg-orange-50 text-orange-700 ring-orange-600/20',
      'Hired': 'bg-green-50 text-green-700 ring-green-600/20',
      'Rejected': 'bg-red-50 text-red-700 ring-red-600/10',
      'Scheduled': 'bg-blue-50 text-blue-700 ring-blue-600/20',
      'In Progress': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
      'Completed': 'bg-green-50 text-green-700 ring-green-600/20',
      'Cancelled': 'bg-red-50 text-red-700 ring-red-600/10'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20';
  };

  return (
    <PageTemplate 
      title={t('Dashboard')}
      url="/dashboard"
      actions={pageActions}
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* Total Employees */}
          <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl group">
            <div className="absolute right-0 bottom-0 pointer-events-none">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-50/80">
                <path d="M0 60C30 60 40 40 60 40C80 40 90 20 120 20V60H0Z" fill="currentColor"/>
                <path d="M20 60C50 60 60 50 80 50C100 50 110 30 120 30V60H20Z" fill="currentColor" opacity="0.5"/>
              </svg>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-[72px] h-[72px] rounded-2xl bg-blue-50/80 flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col relative z-10 pt-1">
                  <p className="text-[14px] font-semibold text-gray-700 mb-0.5">{t('Total Employees')}</p>
                  <p className="text-[32px] leading-tight font-bold text-gray-900 tracking-tight mb-1">{stats.totalEmployees}</p>
                  <div className="flex items-center text-[13px] font-medium text-emerald-500">
                    {stats.newEmployeesThisMonth > 0 ? (
                      <><TrendingUp className="w-3.5 h-3.5 mr-1.5" /> +{stats.newEmployeesThisMonth} {t('this month')}</>
                    ) : (
                      <span className="text-gray-400 font-normal">{t('No new hires')}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branches */}
          <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl group">
            <div className="absolute -right-4 -bottom-4 pointer-events-none">
              <div className="w-24 h-24 bg-emerald-50/80 rounded-full blur-md"></div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-[72px] h-[72px] rounded-2xl bg-emerald-50/80 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col relative z-10 pt-1">
                  <p className="text-[14px] font-semibold text-gray-700 mb-0.5">{t('Branches')}</p>
                  <p className="text-[32px] leading-tight font-bold text-gray-900 tracking-tight mb-1">{stats.totalBranches}</p>
                  <div className="flex items-center text-[13px] text-gray-500">
                    {stats.totalDepartments} {t('Departments')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Rate */}
          <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl group">
            <div className="absolute right-4 bottom-4 pointer-events-none opacity-40">
              <div className="grid grid-cols-4 gap-1.5">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-200"></div>
                ))}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-[72px] h-[72px] rounded-2xl bg-purple-50/80 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-purple-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col relative z-10 pt-1">
                  <p className="text-[14px] font-semibold text-gray-700 mb-0.5">{t('Attendance Rate')}</p>
                  <p className="text-[32px] leading-tight font-bold text-gray-900 tracking-tight mb-1">{stats.attendanceRate}%</p>
                  <div className="flex items-center text-[13px] text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    {stats.presentToday} {t('Present Today')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Leaves */}
          <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl group">
            <div className="absolute -right-8 -bottom-8 pointer-events-none">
              <div className="w-32 h-32 border-[16px] border-amber-50/80 rounded-full"></div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-[72px] h-[72px] rounded-2xl bg-amber-50/80 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col relative z-10 pt-1">
                  <p className="text-[14px] font-semibold text-gray-700 mb-0.5">{t('Pending Leaves')}</p>
                  <p className="text-[32px] leading-tight font-bold text-gray-900 tracking-tight mb-1">{stats.pendingLeaves}</p>
                  <div className="flex items-center text-[13px] text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    {stats.onLeaveToday} {t('Out Today')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Jobs */}
          <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl group">
            <div className="absolute right-0 bottom-0 pointer-events-none">
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-50/80">
                <path d="M0 80C20 80 30 60 50 60C70 60 80 40 100 40V80H0Z" fill="currentColor"/>
              </svg>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-[72px] h-[72px] rounded-2xl bg-rose-50/80 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-rose-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col relative z-10 pt-1">
                  <p className="text-[14px] font-semibold text-gray-700 mb-0.5">{t('Active Jobs')}</p>
                  <p className="text-[32px] leading-tight font-bold text-gray-900 tracking-tight mb-1">{stats.activeJobPostings}</p>
                  <div className="flex items-center text-[13px] font-medium text-rose-500">
                    <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                    +{stats.jobPostsThisMonth} {t('this month')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Candidates */}
          <Card className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl group">
            <div className="absolute right-0 bottom-0 pointer-events-none">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-50/80">
                <path d="M0 60C30 60 40 40 60 40C80 40 90 20 120 20V60H0Z" fill="currentColor"/>
              </svg>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-[72px] h-[72px] rounded-2xl bg-indigo-50/80 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-8 h-8 text-indigo-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col relative z-10 pt-1">
                  <p className="text-[14px] font-semibold text-gray-700 mb-0.5">{t('Total Candidates')}</p>
                  <p className="text-[32px] leading-tight font-bold text-gray-900 tracking-tight mb-1">{stats.totalCandidates}</p>
                  <div className="flex items-center text-[13px] font-medium text-indigo-500">
                    <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                    +{stats.candidatesThisMonth} {t('this month')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Section */}
        {/* Career Section */}
        {stats.activeJobPostings > 0 && hasPermission(auth?.permissions || [], 'manage-career-page') && (
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:shadow-xl transition-all duration-500 group">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwdjhINHYtOEgweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjI1Ij48L3BhdGg+Cjwvc3ZnPg==')]"></div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative group-hover:scale-105 transition-transform duration-500">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/30 group-hover:border-white/50 transition-colors duration-500">
                    <Briefcase className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-indigo-500 flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-white/90 transition-colors duration-300">{t('Join Our Team')}</h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      {stats.activeJobPostings} {t('open positions')}
                    </span>
                    <span className="text-indigo-100 text-sm font-medium">{t('Discover amazing career opportunities')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleCopyCareerLink}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-white/30 text-white hover:text-white backdrop-blur-sm transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                      {t('Copied!')}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2 opacity-80" />
                      {t('Copy Link')}
                    </>
                  )}
                </Button>
                <Button
                  onClick={openCareerPage}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-xl relative overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/50 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 font-bold">{t('View Careers')}</span>
                  <ExternalLink className="h-4 w-4 ml-2 opacity-80 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Department Distribution Chart */}
          <Card className="border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center">
                  <PieChartIcon className="w-5 h-5 text-blue-500" />
                </div>
                <CardTitle className="text-[16px] font-bold text-gray-900">
                  {t('Department Distribution')}
                </CardTitle>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {charts.departmentStats.length > 0 ? (
                <>
                  <div className="flex items-center flex-1 py-4">
                    <div className="w-1/2 h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={charts.departmentStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                          >
                            {charts.departmentStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            itemStyle={{ fontWeight: 600 }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 flex flex-col gap-3 pl-4">
                      {charts.departmentStats.map((stat, i) => {
                        const total = charts.departmentStats.reduce((acc, curr) => acc + curr.value, 0);
                        const percent = total > 0 ? Math.round((stat.value / total) * 100) : 0;
                        return (
                          <div key={i} className="flex items-center justify-between text-[13px]">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }}></div>
                              <span className="text-gray-600 font-medium">{stat.name}</span>
                            </div>
                            <div className="flex items-center gap-2 pr-4">
                              <span className="text-gray-900 font-semibold">{stat.value}</span>
                              <span className="text-gray-400">({percent}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-12 bg-slate-50 rounded-xl p-3 text-[13px] font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-900 font-bold">{stats.totalDepartments}</span> {t('Departments')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-900 font-bold">{stats.totalEmployees}</span> {t('Total Employees')}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[240px] text-muted-foreground bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                  {t('No department data available')}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hiring Trend Chart */}
          <Card className="border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <CardTitle className="text-[16px] font-bold text-gray-900">
                  {t('Hiring Trend (6 Months)')}
                </CardTitle>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 cursor-pointer hover:bg-gray-50">
                6 Months <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {charts.hiringTrend.length > 0 ? (
                <>
                  <div className="flex-1 min-h-[200px] mt-2 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={charts.hiringTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} tickMargin={10} />
                        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area 
                          type="linear" 
                          dataKey="hires" 
                          stroke="#3b82f6" 
                          strokeWidth={2.5}
                          fillOpacity={1} 
                          fill="url(#colorHires)"
                          activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                          dot={{ r: 4, strokeWidth: 2, fill: '#3b82f6', stroke: '#fff' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-gray-900">62% more hires in Jul 2026</p>
                        <p className="text-[13px] text-gray-500">Great momentum! Keep it up.</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[240px] text-muted-foreground bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                  {t('No hiring data available')}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Candidate Status Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <UserPlus className="h-5 w-5 text-emerald-500" />
                {t('Candidate Status')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {charts.candidateStatusStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={charts.candidateStatusStats}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {charts.candidateStatusStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        backdropFilter: 'blur(8px)',
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[260px] text-muted-foreground bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                  {t('No candidate data available')}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leave Types Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Calendar className="h-5 w-5 text-amber-500" />
                {t('Leave Types')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {charts.leaveTypesStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={charts.leaveTypesStats}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {charts.leaveTypesStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        backdropFilter: 'blur(8px)',
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[260px] text-muted-foreground bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                  {t('No leave types available')}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        {/* Recent Activities */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Leave Applications */}
          <Card className="border-0 shadow-lg relative overflow-hidden">
            <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
              <CardTitle className="flex items-center justify-between text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  {t('Recent Leaves')}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white">{recentActivities.leaves.length}</Badge>
                  <button 
                    onClick={() => window.location.href = route('hr.leave-applications.index')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all"
                  >
                    {t('View All')} &rarr;
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {recentActivities.leaves.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                  {recentActivities.leaves.map((leave, index) => (
                    <div key={index} className="group flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 hover:border-blue-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="flex gap-4 items-center w-full">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-shrink-0 items-center justify-center text-gray-600 font-bold shadow-inner border border-gray-100">
                          {leave.employee?.name ? leave.employee.name.charAt(0) : 'E'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate pr-4">{leave.employee?.name || 'Employee'}</p>
                            <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-0 ${getStatusColor(leave.status)}`}>
                              {t(leave.status.charAt(0).toUpperCase() + leave.status.slice(1))}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            <span className="text-gray-700">{leave.leave_type?.name || 'Leave'}</span> • {leave.start_date
                              ? (window.appSettings?.formatDateTimeSimple(leave.start_date, false) || leave.start_date)
                              : 'N/A'} - {leave.end_date
                              ? (window.appSettings?.formatDateTimeSimple(leave.end_date, false) || leave.end_date)
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">{t('No recent leave applications')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Candidates */}
          <Card className="border-0 shadow-lg relative overflow-hidden">
            <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
              <CardTitle className="flex items-center justify-between text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100/50 rounded-lg">
                    <UserPlus className="h-5 w-5 text-emerald-600" />
                  </div>
                  {t('Recent Candidates')}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white">{recentActivities.candidates.length}</Badge>
                  <button 
                    onClick={() => window.location.href = route('hr.recruitment.candidates.index')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all"
                  >
                    {t('View All')} &rarr;
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {recentActivities.candidates.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                  {recentActivities.candidates.map((candidate, index) => (
                    <div key={index} className="group flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 hover:border-emerald-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="flex gap-4 items-center w-full">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-shrink-0 items-center justify-center text-gray-600 font-bold shadow-inner border border-gray-100">
                          {candidate.first_name ? candidate.first_name.charAt(0) : 'C'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate pr-4">{candidate.first_name} {candidate.last_name}</p>
                            <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-0 ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            <span className="text-gray-700">{candidate.job?.title || 'Job'}</span> • {candidate.application_date
                              ? (window.appSettings?.formatDateTimeSimple(candidate.application_date, false) || candidate.application_date)
                              : candidate.created_at
                                ? (window.appSettings?.formatDateTimeSimple(candidate.created_at, false) || candidate.created_at)
                                : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <UserPlus className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">{t('No recent candidates')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="border-0 shadow-lg relative overflow-hidden">
            <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
              <CardTitle className="flex items-center justify-between text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-rose-100/50 rounded-lg">
                    <Bell className="h-5 w-5 text-rose-600" />
                  </div>
                  {t('Announcements')}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white">{recentActivities.announcements.length}</Badge>
                  <button 
                    onClick={() => window.location.href = route('hr.announcements.index')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all"
                  >
                    {t('View All')} &rarr;
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {recentActivities.announcements.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                  {recentActivities.announcements.map((announcement, index) => (
                    <div key={index} className="group flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 hover:border-rose-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="flex gap-4 items-center w-full">
                        <div className={`w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center shadow-inner border border-gray-100 ${announcement.is_high_priority ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-gray-50 text-gray-600'}`}>
                          <Bell className={`h-5 w-5 ${announcement.is_high_priority ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate pr-4">{announcement.title}</p>
                            {announcement.is_high_priority && (
                              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-0 bg-red-50 text-red-700 ring-1 ring-red-600/20">
                                High Priority
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            <span className="text-gray-700">{announcement.category}</span> • {announcement.created_at
                              ? (window.appSettings?.formatDateTimeSimple(announcement.created_at, false) || announcement.created_at)
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Bell className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">{t('No recent announcements')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Meetings */}
          <Card className="border-0 shadow-lg relative overflow-hidden">
            <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
              <CardTitle className="flex items-center justify-between text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-100/50 rounded-lg">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  {t('Recent Meetings')}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white">{recentActivities.meetings.length}</Badge>
                  <button 
                    onClick={() => window.location.href = route('meetings.meetings.index')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all"
                  >
                    {t('View All')} &rarr;
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {recentActivities.meetings.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                  {recentActivities.meetings.map((meeting, index) => (
                    <div key={index} className="group flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-gray-100 hover:border-indigo-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="flex gap-4 items-center w-full">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50/80 flex flex-shrink-0 items-center justify-center shadow-inner border border-indigo-100 text-indigo-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate pr-4">{meeting.title}</p>
                            <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-0 ${getStatusColor(meeting.status)}`}>
                              {t(meeting.status)}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            {(() => {
                              if (!meeting.meeting_date) return 'No date set';
                              const dateStr = window.appSettings?.formatDateTimeSimple(meeting.meeting_date, false) || meeting.meeting_date;
                              const timeStr = meeting.start_time && meeting.end_time ? ` • ${meeting.start_time} - ${meeting.end_time}` : '';
                              return <><span className="text-gray-700">{dateStr}</span>{timeStr}</>;
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">{t('No recent meetings')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Employee Growth Chart - Full Width */}
        <Card className="border-0 shadow-lg relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              {t('Employee Growth')} ({new Date().getFullYear()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {charts.employeeGrowthChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={charts.employeeGrowthChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      backdropFilter: 'blur(8px)',
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }} 
                    itemStyle={{ color: '#111827', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="employees" 
                    stroke="#6366f1" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorGrowth)"
                    activeDot={{ r: 8, strokeWidth: 0, fill: '#6366f1', style: { filter: 'drop-shadow(0px 4px 6px rgba(99, 102, 241, 0.5))' } }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                {t('No employee growth data available')}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}