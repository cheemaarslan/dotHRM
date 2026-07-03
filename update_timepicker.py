import re
import sys

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\components\CrudFormModal.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports_to_add = """import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import TimeKeeper from '@axelixlabs/react-timepicker';
import { Clock } from 'lucide-react';
"""

content = content.replace("import DependentDropdown from '@/components/DependentDropdown';", "import DependentDropdown from '@/components/DependentDropdown';\n" + imports_to_add)

# Add TimeInputField component
time_input_field = """// Standalone time input with Material UI TimePicker
function TimeInputField({ field, timeValue, handleChange, errors, mode }: {
  field: FormField;
  timeValue: string;
  handleChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  mode: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Format the time value from 24h to 12h for display
  const displayTime = () => {
    if (!timeValue) return '';
    
    // timeValue is usually HH:mm or HH:mm:ss
    const parts = timeValue.split(':');
    if (parts.length >= 2) {
      let hours = parseInt(parts[0], 10);
      const minutes = parts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }
    return timeValue;
  };

  if (mode === 'view') {
    return (
      <div className="p-2 border rounded-md bg-gray-50 flex items-center justify-between">
        <span>{displayTime() || '-'}</span>
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className={`relative cursor-pointer flex items-center justify-between border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] hover:bg-muted/50 md:text-sm ${errors[field.name] ? 'border-red-500' : ''} ${field.disabled ? 'pointer-events-none opacity-50' : ''}`}>
          <span className={timeValue ? '' : 'text-muted-foreground'}>
            {displayTime() || field.placeholder || '--:--'}
          </span>
          <Clock className="w-4 h-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-xl overflow-hidden" align="start">
        <TimeKeeper
          time={timeValue || '12:00'}
          onChange={(newTime) => handleChange(field.name, newTime.formatted24)}
          onDoneClick={() => setIsOpen(false)}
          switchToMinuteOnHourSelect
        />
      </PopoverContent>
    </Popover>
  );
}

"""

content = content.replace("export function CrudFormModal({", time_input_field + "export function CrudFormModal({")

# Update case 'time':
old_time_case = """      case 'time':
        return (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              const input = (e.currentTarget as HTMLElement).querySelector('input');
              try { (input as any)?.showPicker?.(); } catch { input?.focus(); }
            }}
          >
            <Input
              id={field.name}
              name={field.name}
              type="time"
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className={`cursor-pointer${errors[field.name] ? ' border-red-500' : ''}`}
              disabled={field.disabled || mode === 'view'}
              readOnly={field.readOnly}
            />
          </div>
        );"""

new_time_case = """      case 'time':
        return (
          <TimeInputField
            field={field}
            timeValue={formData[field.name] || ''}
            handleChange={handleChange}
            errors={errors}
            mode={mode}
          />
        );"""

content = content.replace(old_time_case, new_time_case)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CrudFormModal.tsx with new TimePicker")
