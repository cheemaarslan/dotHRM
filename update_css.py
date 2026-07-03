import sys

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\css\app.css'

css_content = """

/* ==========================================================================
   FullCalendar Premium Redesign Overrides
   ========================================================================== */

.custom-calendar-wrapper {
  --fc-border-color: rgba(0, 0, 0, 0.04);
  --fc-daygrid-event-dot-width: 0px;
  --fc-event-bg-color: transparent;
  --fc-event-border-color: transparent;
  --fc-today-bg-color: rgba(var(--primary), 0.03);
  --fc-page-bg-color: transparent;
  --fc-neutral-bg-color: transparent;
  --fc-list-event-hover-bg-color: rgba(0,0,0,0.02);
  --fc-button-bg-color: white;
  --fc-button-border-color: #e2e8f0;
  --fc-button-text-color: #334155;
  --fc-button-hover-bg-color: #f8fafc;
  --fc-button-hover-border-color: #cbd5e1;
  --fc-button-active-bg-color: #f1f5f9;
  --fc-button-active-border-color: #cbd5e1;
}

.dark .custom-calendar-wrapper {
  --fc-border-color: rgba(255, 255, 255, 0.05);
  --fc-today-bg-color: rgba(255, 255, 255, 0.02);
  --fc-button-bg-color: #1e293b;
  --fc-button-border-color: #334155;
  --fc-button-text-color: #e2e8f0;
  --fc-button-hover-bg-color: #334155;
  --fc-button-hover-border-color: #475569;
  --fc-button-active-bg-color: #475569;
  --fc-button-active-border-color: #64748b;
}

/* Header Toolbar */
.fc-header-toolbar.fc-toolbar {
  margin-bottom: 2rem !important;
  padding: 0 0.5rem;
}

.fc-toolbar-title {
  font-size: 1.5rem !important;
  font-weight: 800 !important;
  letter-spacing: -0.025em;
  color: inherit;
}

/* Custom Pill Buttons */
.fc .fc-button {
  border-radius: 9999px !important;
  font-weight: 600 !important;
  text-transform: capitalize !important;
  padding: 0.5rem 1rem !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s ease !important;
  font-size: 0.875rem !important;
  margin-left: 0.25rem !important;
}

.fc .fc-button-primary:not(:disabled):active, 
.fc .fc-button-primary:not(:disabled).fc-button-active {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06) !important;
  transform: translateY(1px);
}

.fc .fc-button-group > .fc-button:not(:first-child) {
  margin-left: -1px !important;
}

.fc .fc-button-group > .fc-button:first-child {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.fc .fc-button-group > .fc-button:not(:first-child):not(:last-child) {
  border-radius: 0 !important;
}

.fc .fc-button-group > .fc-button:last-child {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.fc-prev-button.fc-button, .fc-next-button.fc-button {
  padding: 0.5rem !important;
  border-radius: 9999px !important;
}

/* Grid & Days */
.fc-theme-standard th {
  border: none !important;
  padding: 1rem 0 !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #64748b;
}

.dark .fc-theme-standard th {
  color: #94a3b8;
}

.fc-theme-standard td, .fc-theme-standard th {
  border-color: var(--fc-border-color) !important;
}

.fc-scrollgrid {
  border: none !important;
}

.fc-daygrid-day-frame {
  min-height: 120px !important;
  padding: 4px !important;
}

/* Day Numbers */
.fc-daygrid-day-top {
  flex-direction: row !important;
  justify-content: flex-end;
  padding: 4px;
}

.fc-daygrid-day-number {
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: inherit;
  transition: all 0.2s ease;
  padding: 0 !important;
}

.fc-daygrid-day:hover .fc-daygrid-day-number {
  background-color: rgba(0, 0, 0, 0.04);
}

.dark .fc-daygrid-day:hover .fc-daygrid-day-number {
  background-color: rgba(255, 255, 255, 0.1);
}

.fc-day-today .fc-daygrid-day-number {
  background-color: hsl(var(--primary)) !important;
  color: hsl(var(--primary-foreground)) !important;
  box-shadow: 0 4px 6px -1px rgba(var(--primary), 0.2), 0 2px 4px -1px rgba(var(--primary), 0.1);
}

/* Events */
.fc-daygrid-event-harness {
  margin-bottom: 6px !important;
}

.fc-daygrid-event {
  background: transparent !important;
  border: none !important;
}

.custom-event-container {
  overflow: hidden;
}

/* Remove default FullCalendar event dot and styling */
.fc-h-event .fc-event-main, .fc-v-event .fc-event-main {
  color: inherit;
}

.fc-daygrid-dot-event .fc-event-title {
  font-weight: inherit !important;
}

/* TimeGrid (Week/Day) Specific Adjustments */
.fc-timegrid-slot {
  height: 3em !important;
}

.fc-timegrid-slot-label-cushion {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  padding-right: 1rem !important;
}

.fc-v-event {
  border-radius: 6px !important;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.fc-timegrid-event .fc-event-main {
  padding: 0 !important;
  height: 100%;
}

.fc-timegrid-event .custom-event-container {
  height: 100%;
  border-radius: 4px;
}
"""

with open(file_path, 'a', encoding='utf-8') as f:
    f.write(css_content)

print("Updated app.css")
