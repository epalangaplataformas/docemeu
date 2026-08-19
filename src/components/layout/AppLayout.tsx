import { Outlet } from 'react-router';
import { useState } from 'react';
import { Sidebar } from './Sidebar.tsx';
import { TopBar } from './TopBar.tsx';
import { MobileNav } from './MobileNav.tsx';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      {/* Navegação mobile (inferior) */}
      <MobileNav />
    </div>
  );
}
