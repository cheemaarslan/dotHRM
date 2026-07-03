import React, { useId } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SparklineDataPoint {
  value: number;
}

interface SparklineStatCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  percentage: number;
  percentageText?: string;
  theme?: 'blue' | 'yellow' | 'cyan' | 'emerald';
  data: SparklineDataPoint[];
}

const themeColors = {
  blue: { stroke: '#3b82f6', fill: '#3b82f6' },
  yellow: { stroke: '#eab308', fill: '#eab308' },
  cyan: { stroke: '#06b6d4', fill: '#06b6d4' },
  emerald: { stroke: '#10b981', fill: '#10b981' },
};

export function SparklineStatCard({
  title,
  subtitle = '/ Total',
  value,
  percentage,
  percentageText = 'last week',
  theme = 'blue',
  data,
}: SparklineStatCardProps) {
  const isPositive = percentage >= 0;
  const PercentageIcon = isPositive ? TrendingUp : TrendingDown;
  const percentageColorClass = isPositive ? 'text-emerald-500' : 'text-rose-500';
  const colors = themeColors[theme] || themeColors.blue;
  const gradientId = `colorSparkline-${useId().replace(/:/g, '')}`;

  return (
    <Card className="overflow-hidden bg-card border shadow-sm h-full">
      <CardContent className="p-5 flex items-center justify-between h-full">
        {/* Left Side: Info */}
        <div className="flex flex-col space-y-4 justify-between h-full">
          <div className="flex items-center gap-1">
            <span className="text-[14px] font-semibold text-foreground tracking-wide">
              {title}
            </span>
            {subtitle && (
              <span className="text-[14px] text-muted-foreground/60 font-medium">
                {subtitle}
              </span>
            )}
          </div>
          
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </div>
          
          <div className="flex items-center gap-1.5 mt-auto">
            <div className={`flex items-center gap-1 ${percentageColorClass} bg-transparent border rounded px-1.5 py-0.5 text-[11px] font-medium border-current opacity-80`}>
              <PercentageIcon className="w-3 h-3" />
              <span>{isPositive ? '+' : ''}{percentage}%</span>
            </div>
            <span className="text-[12px] text-muted-foreground ml-1">
              {percentageText}
            </span>
          </div>
        </div>

        {/* Right Side: Sparkline Chart */}
        <div className="w-[120px] h-[60px] relative mt-2 self-end">
          {/* Tooltip-like label above the last point */}
          <div className="absolute -top-6 right-0 text-[12px] font-bold text-foreground flex items-center justify-center">
            {percentage}%
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.fill} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={colors.fill} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.stroke}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                animationDuration={1500}
                isAnimationActive={true}
                dot={(props: any) => {
                  const { cx, cy, index, dataKey } = props;
                  if (index === data.length - 1) {
                    return (
                      <circle key={`dot-${index}`} cx={cx} cy={cy} r={4} fill={colors.stroke} stroke="none" />
                    );
                  }
                  return null;
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
