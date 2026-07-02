import React from 'react';

interface DynamicTitleProps {
  title: string;
  brandColor: string;
}

export default function DynamicTitle({ title, brandColor }: DynamicTitleProps) {
  const lines = title.split('\n');
  return (
    <>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/,(.*?),/g);
        
        return (
          <React.Fragment key={lineIndex}>
            {parts.map((part, index) => {
              if (index % 2 === 1) {
                return (
                  <span key={index} className="relative inline-block">
                    <span style={{ color: brandColor }} className="relative z-10">{part}</span>
                    <svg className="absolute -top-3 -right-3 w-8 h-8 opacity-80 pointer-events-none" style={{ color: brandColor }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2v3M19 5l-2.5 2.5M22 12h-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <svg className="absolute w-[110%] h-3 -bottom-1 left-1/2 -translate-x-1/2 opacity-30 z-0" style={{ color: brandColor }} viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                      <path d="M3 9C50 3 150 3 197 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                );
              }
              return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
            {lineIndex < lines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        );
      })}
    </>
  );
}
