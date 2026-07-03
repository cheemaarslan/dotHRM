import sys

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\pages\calendar\index.tsx'

content = """import React, { useState, useRef, useEffect } from 'react';
import { PageTemplate } from '@/components/page-template';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Coffee, Palmtree, UserMinus, Calendar as CalendarIcon, Clock, Users, Plus, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CalendarEvent {
  id: number;
  title: string;
  start: string | Date;
  end: string | Date;
  type: 'meeting' | 'holiday' | 'leave';
  allDay?: boolean;
  color: string;
  status?: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  canManage: boolean;
}

export default function CalendarIndex({ events: initialEvents, canManage }: CalendarProps) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);
  
  // Filters State
  const [showMeetings, setShowMeetings] = useState(true);
  const [showHolidays, setShowHolidays] = useState(true);
  const [showLeaves, setShowLeaves] = useState(true);

  // Derived filtered events
  const filteredEvents = initialEvents.filter(event => {
    if (event.type === 'meeting' && !showMeetings) return false;
    if (event.type === 'holiday' && !showHolidays) return false;
    if (event.type === 'leave' && !showLeaves) return false;
    return true;
  });

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Calendar') }
  ];

  const handleEventClick = (clickInfo: any) => {
    const event = initialEvents.find(e => e.id === clickInfo.event.id || String(e.id) === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsDialogOpen(true);
    }
  };

  // Custom Event Content Renderer
  const renderEventContent = (eventInfo: any) => {
    const eventType = eventInfo.event.extendedProps.type;
    const isAllDay = eventInfo.event.allDay;
    
    let Icon = CalendarIcon;
    let typeClass = '';
    
    if (eventType === 'meeting') {
      Icon = Coffee;
      typeClass = 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
    } else if (eventType === 'holiday') {
      Icon = Palmtree;
      typeClass = 'border-l-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    } else if (eventType === 'leave') {
      Icon = UserMinus;
      typeClass = 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
    }

    return (
      <div className={`flex items-center gap-1.5 w-full overflow-hidden p-1 px-1.5 rounded-sm border-l-4 ${typeClass}`}>
        <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
        <div className="flex flex-col overflow-hidden leading-tight">
          <span className="font-semibold text-xs truncate">
            {eventInfo.event.title}
          </span>
          {!isAllDay && eventInfo.timeText && (
            <span className="text-[10px] opacity-80 font-medium tracking-wide">
              {eventInfo.timeText}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageTemplate
      title={t('Calendar')}
      url="/calendar"
      breadcrumbs={breadcrumbs}
    >
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)]">
        
        {/* Left Sidebar - Filters & Controls */}
        <div className="w-full lg:w-72 flex flex-col gap-6 flex-shrink-0">
          {canManage && (
            <Button className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              {t('New Event')}
            </Button>
          )}

          {/* Mini Monthly Calendar placeholder / Custom Widget */}
          <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="pb-4 pt-5 px-5">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-primary" />
                {t('Quick Filters')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                      <Coffee className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Label htmlFor="toggle-meetings" className="cursor-pointer font-medium text-sm text-blue-900 dark:text-blue-100">
                      {t('Meetings')}
                    </Label>
                  </div>
                  <Switch 
                    id="toggle-meetings" 
                    checked={showMeetings} 
                    onCheckedChange={setShowMeetings}
                    className="data-[state=checked]:bg-blue-600" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 transition-colors hover:bg-green-50 dark:hover:bg-green-900/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md">
                      <Palmtree className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <Label htmlFor="toggle-holidays" className="cursor-pointer font-medium text-sm text-green-900 dark:text-green-100">
                      {t('Holidays')}
                    </Label>
                  </div>
                  <Switch 
                    id="toggle-holidays" 
                    checked={showHolidays} 
                    onCheckedChange={setShowHolidays}
                    className="data-[state=checked]:bg-green-600" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 transition-colors hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-md">
                      <UserMinus className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <Label htmlFor="toggle-leaves" className="cursor-pointer font-medium text-sm text-yellow-900 dark:text-yellow-100">
                      {t('Leaves')}
                    </Label>
                  </div>
                  <Switch 
                    id="toggle-leaves" 
                    checked={showLeaves} 
                    onCheckedChange={setShowLeaves}
                    className="data-[state=checked]:bg-yellow-600" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-card to-muted/20 flex-1">
             <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                <List className="w-4 h-4" />
                {t('Upcoming')}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-4">
               <ScrollArea className="h-48 px-2">
                 {filteredEvents.slice(0, 5).map(event => (
                   <div key={event.id} className="py-2.5 border-b last:border-0 border-border/50 flex flex-col gap-1 cursor-pointer hover:bg-muted/50 px-2 rounded-md transition-colors" onClick={() => handleEventClick({event: {id: event.id}})}>
                     <span className="text-xs font-bold truncate">{event.title}</span>
                     <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                       <Clock className="w-3 h-3" />
                       {new Date(event.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                     </span>
                   </div>
                 ))}
               </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar View */}
        <div className="flex-1 min-w-0 bg-card rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20 border border-border/50 overflow-hidden custom-calendar-wrapper flex flex-col relative">
          {/* Subtle gradient overlay at top for premium feel */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0"></div>
          
          <div className="flex-1 relative z-10 p-6">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'title',
                center: '',
                right: 'prev,next today dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={filteredEvents}
              height="100%"
              editable={canManage}
              selectable={canManage}
              selectMirror={true}
              dayMaxEvents={3}
              weekends={true}
              eventContent={renderEventContent}
              eventClassNames="custom-event-container border-none shadow-sm rounded-md transition-all hover:scale-[1.02] hover:shadow-md hover:z-10 bg-transparent"
              eventClick={handleEventClick}
              displayEventTime={true}
              fixedWeekCount={false}
              showNonCurrentDates={false}
              firstDay={1}
            />
          </div>
        </div>
      </div>

      {/* Premium Event Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl">
          {/* Dynamic Header Banner */}
          <div className={`h-24 p-6 flex items-end justify-between
            ${selectedEvent?.type === 'meeting' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : ''}
            ${selectedEvent?.type === 'holiday' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : ''}
            ${selectedEvent?.type === 'leave' ? 'bg-gradient-to-r from-amber-500 to-orange-600' : ''}
          `}>
            <div className="flex items-center gap-2">
               <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none shadow-sm backdrop-blur-sm">
                {selectedEvent?.type === 'meeting' && <Coffee className="w-3 h-3 mr-1.5" />}
                {selectedEvent?.type === 'holiday' && <Palmtree className="w-3 h-3 mr-1.5" />}
                {selectedEvent?.type === 'leave' && <UserMinus className="w-3 h-3 mr-1.5" />}
                <span className="capitalize">{selectedEvent?.type}</span>
              </Badge>
              {selectedEvent?.status && (
                <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm capitalize">{selectedEvent.status}</Badge>
              )}
            </div>
            {selectedEvent?.allDay && (
              <Badge variant="secondary" className="bg-white text-gray-900 shadow-sm border-none">{t('All Day')}</Badge>
            )}
          </div>

          <div className="p-6 pt-5 bg-card">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-extrabold tracking-tight">{selectedEvent?.title}</DialogTitle>
              <DialogDescription className="text-sm opacity-80 mt-1">
                 Event Details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-full bg-muted`}>
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{t('Start')}</span>
                  <span className="font-semibold text-[15px] mt-0.5">
                    {selectedEvent?.start ? new Date(selectedEvent.start).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: selectedEvent.allDay ? undefined : 'numeric', minute: selectedEvent.allDay ? undefined : '2-digit' }) : ''}
                  </span>
                </div>
              </div>

              {selectedEvent?.end && (
                 <div className="flex items-start gap-4">
                 <div className={`p-2.5 rounded-full bg-muted`}>
                   <Clock className="w-5 h-5 text-muted-foreground" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{t('End')}</span>
                   <span className="font-semibold text-[15px] mt-0.5">
                     {new Date(selectedEvent.end).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: selectedEvent.allDay ? undefined : 'numeric', minute: selectedEvent.allDay ? undefined : '2-digit' })}
                   </span>
                 </div>
               </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
}
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.tsx")
