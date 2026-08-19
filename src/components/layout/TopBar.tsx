import { useLocation } from 'react-router';
import { Menu, Bell, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Logo } from '@/components/shared/Logo';
import { useAuthStore } from '@/stores/authStore';

interface TopBarProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/api-keys': 'API Keys',
  '/payments': 'Pagamentos',
  '/users': 'Utilizadores',
  '/notifications': 'Notificações',
  '/webhooks': 'Webhooks',
  '/audit-logs': 'Auditoria',
  '/settings': 'Configurações',
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const title = pageTitles[location.pathname] || 'BuéKumbu';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 md:px-6">
      {/* Lado esquerdo */}
      <div className="flex items-center gap-3">
        {/* Botão de menu mobile */}
        <button
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted md:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo e título em mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Logo size="sm" iconOnly />
          <span className="font-bold text-lg">BuéKumbu</span>
        </div>

        {/* Título da página */}
        <h1 className="hidden md:block text-lg font-semibold text-foreground">
          {title}
        </h1>
      </div>

      {/* Lado direito – ações */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Notificações (placeholder) */}
        <button className="relative inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
        </button>

        {/* Avatar / Logout */}
        <div className="hidden md:flex items-center gap-3 ml-2 pl-3 border-l border-border">
          {user && (
            <>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium leading-none truncate max-w-30">
                  {user.fullName || user.email}
                </span>
                <span className="text-xs text-muted-foreground leading-none mt-1 truncate max-w-30">
                  {user.email}
                </span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                title="Terminar sessão"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
