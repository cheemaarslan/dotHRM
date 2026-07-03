import os

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\pages\employee-dashboard.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the start of the return statement
old_return = """  return (
    <div className="w-full h-full min-h-screen bg-[#f8f9fa] dark:bg-slate-950 p-6 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">"""

new_return = """  const pageActions = [
    {
      label: t('Refresh'),
      icon: <RefreshCw className="h-4 w-4" />,
      variant: 'outline' as any,
      onClick: () => window.location.reload()
    }
  ];

  return (
    <PageTemplate
      title={t('Dashboard')}
      url="/dashboard"
    >
      <div className="max-w-[1400px] mx-auto space-y-6">"""

content = content.replace(old_return, new_return)

# Replace the end of the return statement
old_end = """        </div>
      </div>
    </div>
  );
}"""

new_end = """        </div>
      </div>
    </PageTemplate>
  );
}"""

content = content.replace(old_end, new_end)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("employee-dashboard.tsx updated to use PageTemplate")
