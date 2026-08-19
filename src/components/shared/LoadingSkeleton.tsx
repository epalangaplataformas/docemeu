import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  fullPage?: boolean;
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({ fullPage = false, rows = 5, className }: LoadingSkeletonProps) {
  const skeletonRows = Array.from({ length: rows }, (_, i) => i);

  const content = (
    <div className={cn('space-y-4', className)}>
      {/* Cabeçalho simulado */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
          <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
        </div>
      </div>

      {/* Linhas de conteúdo */}
      {skeletonRows.map((i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-4 flex-1 rounded bg-muted animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
          <div className="h-4 w-24 rounded bg-muted animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }} />
        </div>
      ))}

      {/* Rodapé simulado */}
      <div className="flex justify-end gap-3 pt-4">
        <div className="h-9 w-20 rounded-lg bg-muted animate-pulse" />
        <div className="h-9 w-28 rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md px-4">{content}</div>
      </div>
    );
  }

  return content;
}
