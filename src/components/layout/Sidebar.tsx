import { NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Key,
  Banknote,
  Users,
  Bell,
  Webhook,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/Logo';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/api-keys', icon: Key, label: 'API Keys' },
  { to: '/payments', icon: Banknote, label: 'Pagamentos' },
  { to: '/users', icon: Users, label: 'Utilizadores' },
  { to: '/notifications', icon: Bell, label: 'Notificações' },
  { to: '/webhooks', icon: Webhook, label: 'Webhooks' },
  { to: '/audit-logs', icon: ShieldCheck, label: 'Auditoria' },
  { to: '/settings', icon: Settings, label: 'Configurações' },
];

export function Sidebar({ open, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 256 : 72 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="hidden md:flex flex-col border-r border-border bg-sidebar text-sidebar-foreground h-screen sticky top-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Logo size="sm" iconOnly />
              <span className="font-bold text-lg leading-tight truncate">BuéKumbu</span>
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto"
            >
              <Logo size="sm" iconOnly />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navegação */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || (to === '/' && location.pathname === '/');
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                !open && 'justify-center px-2'
              )}
              title={!open ? label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              <AnimatePresence mode="wait">
                {open && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="truncate"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Botão de colapso */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          title={open ? 'Recolher menu' : 'Expandir menu'}
        >
          {open ? (
            <>
              <ChevronLeft size={18} />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Recolher
              </motion.span>
            </>
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
