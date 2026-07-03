import re
import os

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\pages\employee-dashboard.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add recharts imports
if 'from "recharts"' not in content and "from 'recharts'" not in content:
    imports_to_add = """import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';\n"""
    # Find the last import
    last_import_index = content.rfind('import ')
    end_of_last_import = content.find(';', last_import_index) + 1
    content = content[:end_of_last_import] + '\n' + imports_to_add + content[end_of_last_import:]

# Mock data for the chart
mock_chart_data = """
  const attendanceChartData = [
    { day: 'Mon', hours: 8.5 },
    { day: 'Tue', hours: 8.0 },
    { day: 'Wed', hours: 9.2 },
    { day: 'Thu', hours: 8.1 },
    { day: 'Fri', hours: 7.5 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];
"""
if 'attendanceChartData' not in content:
    insert_pos = content.find('const getStatusColor')
    content = content[:insert_pos] + mock_chart_data + '\n  ' + content[insert_pos:]

# We need to replace the Attendance section with the exact styling from the screenshot
# The old Attendance section starts with:
# {/* Attendance Card */}
old_attendance_start = content.find('{/* Attendance Card */}')
old_attendance_end = content.find('{/* Recent Activities */}')

new_attendance_section = """{/* Attendance Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f4f3ff] dark:bg-indigo-900/30 flex items-center justify-center text-[#5a48eb] dark:text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[17px] font-bold text-slate-900 dark:text-white leading-tight">{t('Attendance')}</h3>
                <p className="text-[13px] text-slate-400 dark:text-slate-500">{t('Track your work hours')}</p>
              </div>
            </div>
            
            {hasPermission(permissions, 'clock-in-out') && (
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={handleClockIn}
                  disabled={isClockedIn}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] font-semibold text-[14px] transition-all ${!isClockedIn ? 'bg-[#00c875] hover:bg-[#00b368] text-white shadow-sm' : 'bg-[#e5e7eb] dark:bg-slate-800 text-[#9ca3af] dark:text-slate-500 cursor-not-allowed shadow-none'}`}
                >
                  <LogIn className="w-4 h-4" />
                  {t('Clock In')}
                </button>
                <button 
                  onClick={handleClockOut}
                  disabled={!isClockedIn}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] font-semibold text-[14px] transition-all ${isClockedIn ? 'bg-[#8c94a3] hover:bg-[#788191] text-white shadow-sm' : 'bg-[#eef2f5] dark:bg-slate-800 text-[#9ca3af] dark:text-slate-500 cursor-not-allowed shadow-none'}`}
                >
                  <LogOut className="w-4 h-4" />
                  {t('Clock Out')}
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[12px] border border-[#d9f6e8] dark:border-green-900/30 bg-[#f8fdfa] dark:bg-green-900/10 p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#d9f6e8] dark:bg-green-900/50 flex items-center justify-center text-[#00c875] dark:text-green-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <p className="text-[13px] font-bold text-[#00c875] dark:text-green-400 mb-0.5">{t('Clock In Time')}</p>
                <p className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{clockInTime || '--:-- --'}</p>
                <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{clockInTime ? t('Clocked in successfully') : t('Not clocked in')}</p>
              </div>
            </div>
            
            <div className="rounded-[12px] border border-[#f6d9d9] dark:border-red-900/30 bg-[#fdf8f8] dark:bg-red-900/10 p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#f6d9d9] dark:bg-red-900/50 flex items-center justify-center text-[#ff5252] dark:text-red-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <p className="text-[13px] font-bold text-[#ff5252] dark:text-red-400 mb-0.5">{t('Clock Out Time')}</p>
                <p className="text-[26px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{clockOutTime || '--:-- --'}</p>
                <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{clockOutTime ? t('Clocked out successfully') : t('Not clocked out')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stunning Chart Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[16px] shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">{t('Weekly Work Hours')}</h3>
            <span className="text-[13px] font-medium text-[#00c875] bg-[#d9f6e8] px-3 py-1 rounded-full">+12% from last week</span>
          </div>
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5a48eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5a48eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#5a48eb', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#5a48eb" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        """

content = content[:old_attendance_start] + new_attendance_section + content[old_attendance_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("employee-dashboard.tsx successfully updated with chart and styling")
