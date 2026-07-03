import os

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\pages\employee-dashboard.tsx'

content = """import React, { useState, useEffect } from 'react';
import { PageTemplate } from '@/components/page-template';
import { RefreshCw, Bell, Users, Clock, LogIn, LogOut, Award, AlertTriangle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePage, router } from '@inertiajs/react';
import { toast } from '@/components/custom-toast';
import { format } from 'date-fns';
import { hasPermission } from '@/utils/authorization';
import { Badge } from '@/components/ui/badge';

interface EmployeeDashboardData {
  stats: {
    totalAwards: number;
    totalWarnings: number;
    totalComplaints: number;
  };
  recentActivities: {
    announcements: Array<any>;
    meetings: Array<any>;
  };
  userType: string;
  todayAttendance?: any;
  employeeShift?: any;
}

export default function EmployeeDashboard({ dashboardData }: { dashboardData: EmployeeDashboardData }) {
  const { t } = useTranslation();
  const { auth } = usePage().props as any;
  const permissions = auth?.permissions || [];
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);

  useEffect(() => {
    const attendance = dashboardData?.todayAttendance;
    if (attendance) {
      if (attendance.clock_in) {
        setClockInTime(new Date(`1970-01-01T${attendance.clock_in}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        setIsClockedIn(!attendance.clock_out);
      }
      if (attendance.clock_out) {
        setClockOutTime(new Date(`1970-01-01T${attendance.clock_out}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      }
    }

    // Auto refresh to check for auto clock out
    const checkAutoClockOut = () => {
      const shift = dashboardData?.employeeShift;
      const attendance = dashboardData?.todayAttendance;

      if (shift && attendance?.clock_in && !attendance?.clock_out && isClockedIn) {
        const now = new Date();
        const shiftEnd = new Date(`1970-01-01T${shift.end_time}`);
        const currentTime = new Date(`1970-01-01T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

        if (currentTime > shiftEnd) {
          window.location.reload();
        }
      }
    };

    const interval = setInterval(checkAutoClockOut, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dashboardData, isClockedIn]);

  const handleClockIn = () => {
    toast.loading(t('Clocking in...'));

    router.post(route('hr.attendance.clock-in'), {
      employee_id: auth.user.id
    }, {
      onSuccess: (page: any) => {
        toast.dismiss();
        if (page.props.flash?.success) {
          setIsClockedIn(true);
          setClockInTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
          toast.success(t(page.props.flash.success));
        } else {
          toast.error(t(page.props.flash.error || 'Failed to clock in'));
        }
      },
      onError: (errors: any, page: any) => {
        toast.dismiss();
        if (page?.props?.flash?.error) {
          toast.error(t(page.props.flash.error));
        } else if (typeof errors === 'string') {
          toast.error(errors);
        } else if (errors && Object.keys(errors).length > 0) {
          const firstError = Object.values(errors)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : firstError as string);
        } else {
          toast.error(t('Failed to clock in. Please try again.'));
        }
      }
    });
  };

  const handleClockOut = () => {
    toast.loading(t('Clocking out...'));

    router.post(route('hr.attendance.clock-out'), {
      employee_id: auth.user.id
    }, {
      onSuccess: (page: any) => {
        toast.dismiss();
        if (page.props.flash?.success) {
          setIsClockedIn(false);
          setClockOutTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
          toast.success(t(page.props.flash.success));
        } else {
          toast.error(t(page.props.flash.error || 'Failed to clock out'));
        }
      },
      onError: (errors: any, page: any) => {
        toast.dismiss();
        if (page?.props?.flash?.error) {
          toast.error(t(page.props.flash.error));
        } else if (typeof errors === 'string') {
          toast.error(errors);
        } else if (errors && Object.keys(errors).length > 0) {
          const firstError = Object.values(errors)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : firstError as string);
        } else {
          toast.error(t('Failed to clock out. Please try again.'));
        }
      }
    });
  };

  const stats = dashboardData?.stats || {
    totalAwards: 0,
    totalWarnings: 0,
    totalComplaints: 0
  };

  const recentActivities = dashboardData?.recentActivities || {
    announcements: [],
    meetings: []
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'approved': 'bg-green-50 text-green-700 ring-green-600/20',
      'pending': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
      'rejected': 'bg-red-50 text-red-700 ring-red-600/20'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20';
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#f8f9fa] dark:bg-slate-950 p-6 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#f5f7fc] to-[#e8edfc] dark:from-slate-900 dark:to-slate-800 px-10 py-12 shadow-sm border border-indigo-50/50 dark:border-slate-800 flex justify-between items-center">
          <div className="z-10 relative">
            <h1 className="text-[22px] font-medium text-slate-700 dark:text-slate-300 mb-2">Welcome back,</h1>
            <h2 className="text-[42px] font-bold text-slate-900 dark:text-white mb-4 tracking-tight leading-none">{auth.user?.name}!</h2>
            <p className="text-[15px] text-slate-500 dark:text-slate-400">Stay updated with company announcements and meetings.</p>
          </div>
          <div className="z-10 relative">
            <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              {t('Refresh')}
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-[60%] opacity-100 pointer-events-none flex justify-end">
            <img src="/images/default/header-illustration.png" alt="Header illustration" className="h-full object-cover object-right mix-blend-multiply dark:mix-blend-screen" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Awards Card */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-start gap-4 z-10 relative">
              <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500 shadow-sm shadow-green-100/50 dark:shadow-none">
                <Award className="w-7 h-7" />
              </div>
              <div className="flex flex-col mt-1">
                <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-none mb-3">{t('Total Awards')}</p>
                <p className="text-[32px] font-bold text-slate-900 dark:text-white leading-none mb-3">{stats.totalAwards}</p>
                <p className="text-[13px] text-slate-400 dark:text-slate-500">{stats.totalAwards === 0 ? t('No awards yet') : t('Total earned awards')}</p>
              </div>
            </div>
            {/* Green Wave Overlay */}
            <svg className="absolute bottom-0 right-0 w-full h-[80%] pointer-events-none opacity-30 text-green-300 dark:text-green-900/40" viewBox="0 0 200 100" preserveAspectRatio="none" fill="currentColor">
              <path d="M50,100 C80,60 140,80 200,20 L200,100 Z" />
            </svg>
          </div>

          {/* Warnings Card */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-start gap-4 z-10 relative">
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-500 shadow-sm shadow-yellow-100/50 dark:shadow-none">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="flex flex-col mt-1">
                <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-none mb-3">{t('Total Warnings')}</p>
                <p className="text-[32px] font-bold text-slate-900 dark:text-white leading-none mb-3">{stats.totalWarnings}</p>
                <p className="text-[13px] text-slate-400 dark:text-slate-500">{stats.totalWarnings === 0 ? t('No warnings') : t('Total issued warnings')}</p>
              </div>
            </div>
            {/* Yellow Wave Overlay */}
            <svg className="absolute bottom-0 right-0 w-full h-[80%] pointer-events-none opacity-30 text-yellow-300 dark:text-yellow-900/40" viewBox="0 0 200 100" preserveAspectRatio="none" fill="currentColor">
              <path d="M50,100 C80,60 140,80 200,20 L200,100 Z" />
            </svg>
          </div>

          {/* Complaints Card */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-start gap-4 z-10 relative">
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 shadow-sm shadow-red-100/50 dark:shadow-none">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="flex flex-col mt-1">
                <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-none mb-3">{t('Total Complaints')}</p>
                <p className="text-[32px] font-bold text-slate-900 dark:text-white leading-none mb-3">{stats.totalComplaints}</p>
                <p className="text-[13px] text-slate-400 dark:text-slate-500">{stats.totalComplaints === 0 ? t('No complaints') : t('Total registered complaints')}</p>
              </div>
            </div>
            {/* Red Wave Overlay */}
            <svg className="absolute bottom-0 right-0 w-full h-[80%] pointer-events-none opacity-30 text-red-300 dark:text-red-900/40" viewBox="0 0 200 100" preserveAspectRatio="none" fill="currentColor">
              <path d="M50,100 C80,60 140,80 200,20 L200,100 Z" />
            </svg>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('Attendance')}</h3>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-0.5">{t('Track your work hours')}</p>
              </div>
            </div>
            
            {hasPermission(permissions, 'clock-in-out') && (
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={handleClockIn}
                  disabled={isClockedIn}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${!isClockedIn ? 'bg-[#00b074] hover:bg-[#009b66] text-white shadow-[#00b074]/20' : 'bg-[#e5e7eb] dark:bg-slate-800 text-[#9ca3af] dark:text-slate-500 cursor-not-allowed shadow-none'}`}
                >
                  <LogIn className="w-4 h-4" />
                  {t('Clock In')}
                </button>
                <button 
                  onClick={handleClockOut}
                  disabled={!isClockedIn}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${isClockedIn ? 'bg-[#8c94a3] hover:bg-[#788191] text-white shadow-[#8c94a3]/20' : 'bg-[#e5e7eb] dark:bg-slate-800 text-[#9ca3af] dark:text-slate-500 cursor-not-allowed shadow-none'}`}
                >
                  <LogOut className="w-4 h-4" />
                  {t('Clock Out')}
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[16px] border border-[#d1f4e5] dark:border-green-900/30 bg-[#f4fbf7] dark:bg-green-900/10 p-7 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-[#d1f4e5] dark:bg-green-900/50 flex items-center justify-center text-[#00b074] dark:text-green-400">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] font-semibold text-[#00b074] dark:text-green-400 mb-1">{t('Clock In Time')}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{clockInTime || '--:-- --'}</p>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{clockInTime ? t('Clocked in successfully') : t('Not clocked in')}</p>
              </div>
            </div>
            
            <div className="rounded-[16px] border border-[#fce3e3] dark:border-red-900/30 bg-[#fdf6f6] dark:bg-red-900/10 p-7 flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-[#fce3e3] dark:bg-red-900/50 flex items-center justify-center text-[#ef4444] dark:text-red-400">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] font-semibold text-[#ef4444] dark:text-red-400 mb-1">{t('Clock Out Time')}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{clockOutTime || '--:-- --'}</p>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{clockOutTime ? t('Clocked out successfully') : t('Not clocked out')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Recent Announcements */}
          <div className="bg-white dark:bg-slate-900 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">{t('Recent Announcements')}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[13px] font-bold text-slate-600 dark:text-slate-300">
                  {recentActivities.announcements.length}
                </div>
                <button 
                  onClick={() => window.location.href = route('hr.announcements.index')}
                  className="px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  {t('View All')}
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              {recentActivities.announcements.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.announcements.slice(0, 3).map((announcement, index) => (
                    <div key={index} className="flex flex-col p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900 dark:text-white">{announcement.title}</p>
                        {announcement.is_high_priority && (
                          <Badge variant="outline" className="text-[11px] ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20 px-2 py-0.5">
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400">
                        {announcement.category} • {(() => {
                          try {
                            return announcement.created_at ? format(new Date(announcement.created_at), 'MMM dd, yyyy') : 'N/A';
                          } catch {
                            return 'Invalid date';
                          }
                        })()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-24 h-24 mb-6 relative">
                    {/* SVG representing a 3D soft bell */}
                    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
                      <circle cx="60" cy="60" r="50" fill="#F8FAFC" />
                      <path d="M60 25C46.1929 25 35 36.1929 35 50V65L25 75V80H95V75L85 65V50C85 36.1929 73.8071 25 60 25Z" fill="#E2E8F0" />
                      <path d="M50 85C50 90.5228 54.4772 95 60 95C65.5228 95 70 90.5228 70 85H50Z" fill="#CBD5E1" />
                      <path d="M60 20C57.2386 20 55 22.2386 55 25H65C65 22.2386 62.7614 20 60 20Z" fill="#94A3B8" />
                      {/* Soft highlights */}
                      <path d="M45 45C45 40 50 35 60 35C70 35 75 40 75 45" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
                    </svg>
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">{t('No recent announcements')}</h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-[250px] mx-auto">{t("You'll see updates here when available.")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Meetings */}
          <div className="bg-white dark:bg-slate-900 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">{t('Recent Meetings')}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[13px] font-bold text-slate-600 dark:text-slate-300">
                  {recentActivities.meetings.length}
                </div>
                <button 
                  onClick={() => window.location.href = route('meetings.meetings.index')}
                  className="px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  {t('View All')}
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              {recentActivities.meetings.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.meetings.slice(0, 3).map((meeting, index) => (
                    <div key={index} className="flex flex-col p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900 dark:text-white">{meeting.title}</p>
                        <Badge variant="outline" className={`text-[11px] ring-1 ring-inset px-2 py-0.5 ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </Badge>
                      </div>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400">
                        {(() => {
                          try {
                            if (!meeting.meeting_date) return 'No date set';
                            const date = new Date(meeting.meeting_date);
                            if (isNaN(date.getTime())) return 'Invalid date';
                            const dateStr = format(date, 'MMM dd, yyyy');
                            const timeStr = meeting.start_time && meeting.end_time ? ` • ${meeting.start_time} - ${meeting.end_time}` : '';
                            return dateStr + timeStr;
                          } catch {
                            return 'Invalid date';
                          }
                        })()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-24 h-24 mb-6 relative">
                    {/* SVG representing a 3D soft calendar */}
                    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
                      <circle cx="60" cy="60" r="50" fill="#F8FAFC" />
                      <rect x="35" y="40" width="50" height="45" rx="8" fill="#E2E8F0" />
                      <path d="M35 52C35 47.5817 38.5817 44 43 44H77C81.4183 44 85 47.5817 85 52V55H35V52Z" fill="#CBD5E1" />
                      <rect x="45" y="35" width="8" height="12" rx="4" fill="#94A3B8" />
                      <rect x="67" y="35" width="8" height="12" rx="4" fill="#94A3B8" />
                      {/* Calendar dots */}
                      <circle cx="45" cy="65" r="3" fill="#94A3B8" />
                      <circle cx="55" cy="65" r="3" fill="#94A3B8" />
                      <circle cx="65" cy="65" r="3" fill="#94A3B8" />
                      <circle cx="75" cy="65" r="3" fill="#94A3B8" />
                      <circle cx="45" cy="75" r="3" fill="#94A3B8" />
                      <circle cx="55" cy="75" r="3" fill="#94A3B8" />
                      <circle cx="65" cy="75" r="3" fill="#94A3B8" />
                    </svg>
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">{t('No recent meetings')}</h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-[250px] mx-auto">{t('Scheduled meetings will appear here.')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("employee-dashboard.tsx successfully replaced with new design")
