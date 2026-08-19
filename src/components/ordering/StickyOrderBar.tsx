import { useOrderStore } from '@/stores/orderStore';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export function StickyOrderBar() {
  const count = useOrderStore(s => s.count());
  const total = useOrderStore(s => s.total());
  const navigate = useNavigate();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-espresso text-marfim p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
      <div className="container-editorial flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider opacity-70">{count} {count === 1 ? 'item' : 'itens'}</p>
          <p className="text-lg font-semibold">{formatCurrency(total)}</p>
        </div>
        <Button onClick={() => navigate('/encomendar')} variant="gold">
          Ver Encomenda
        </Button>
      </div>
    </div>
  );
}
