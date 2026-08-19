import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export function Logo({ size = 'md', iconOnly = false, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img
        src="/logo.png"
        alt="BuéKumbu"
        className={cn('object-contain', sizeClasses[size])}
      />
      {!iconOnly && (
        <span className={cn(
          'font-bold text-foreground',
          size === 'sm' && 'text-base',
          size === 'md' && 'text-lg',
          size === 'lg' && 'text-xl'
        )}>
          BuéKumbu
        </span>
      )}
    </div>
  );
}
