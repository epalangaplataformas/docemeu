import { NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Key,
  Banknote,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/api-keys', icon: Key, label: 'Keys' },
  { to: '/payments', icon: Banknote, label: 'Pagamentos' },
  { to: '/settings', icon: Settings, label: 'Ajustes' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-background/95 backdrop-blur-md h-16 safe-area-bottom">
      {mobileNavItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to || (to === '/' && location.pathname === '/');
        return (
          <NavLink
            key={to}
            to={to}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon
              size={20}
              className={cn(
                'transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <span>{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
