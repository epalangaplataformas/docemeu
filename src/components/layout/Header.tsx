import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Menu', path: '/menu' },
    { name: 'Encomendar', path: '/encomendar' },
    { name: 'Contacto', path: '/contactos' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled || mobileOpen ? "bg-marfim/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container-editorial flex items-center justify-between">
        <Link to="/" className="font-display text-3xl font-bold tracking-tight text-espresso">
          Doce Meu
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-dourado",
                location.pathname === item.path ? "text-dourado" : "text-espresso"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="default" size="sm">
            <Link to="/encomendar">Encomendar</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-espresso"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-marfim border-t border-cacau/10 py-4">
          <nav className="container-editorial flex flex-col gap-4">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} className="text-lg font-medium text-espresso hover:text-dourado">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
