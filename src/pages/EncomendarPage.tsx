import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrderStore } from '@/stores/orderStore';
import { customerSchema, type CustomerDetails } from '@/schemas';
import { WhatsAppOrderService } from '@/services/whatsapp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router';
import { Trash2, Minus, Plus, Loader2, CheckCircle2 } from 'lucide-react';

export function EncomendarPage() {
  const { items, removeItem, updateQuantity, total, clearOrder } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<CustomerDetails>({
    resolver: zodResolver(customerSchema)
  });

  const onSubmit = async (data: CustomerDetails) => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      const result = await WhatsAppOrderService.sendOrder({
        items,
        customer: data
      });

      if (result.success && result.waLink) {
        setSuccess(result.waLink);
        clearOrder();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container-editorial min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
        <CheckCircle2 size={64} className="text-salvia mb-6" />
        <h1 className="text-4xl font-display text-espresso mb-4">Encomenda Preparada!</h1>
        <p className="text-cacau mb-8 max-w-md">
          A sua mensagem está pronta para ser enviada à Doce Meu. Clique no botão abaixo para abrir o WhatsApp.
        </p>
        <a href={success} target="_blank" rel="noreferrer">
          <Button size="lg" variant="gold">Abrir WhatsApp</Button>
        </a>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-editorial min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-display text-espresso mb-4">A sua encomenda está vazia.</h1>
        <p className="text-cacau mb-8">Descubra as nossas especialidades e escolha algo delicioso.</p>
        <Button asChild><Link to="/menu">Ver Menu</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-editorial py-32">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Formulário */}
        <div>
          <h1 className="text-4xl font-display text-espresso mb-8">Os seus dados</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Nome *</label>
              <Input {...register('name')} placeholder="O seu nome" />
              {errors.name && <p className="text-bordo text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Telefone *</label>
              <Input {...register('phone')} placeholder="+351 ..." />
              {errors.phone && <p className="text-bordo text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Email (opcional)</label>
              <Input {...register('email')} placeholder="email@exemplo.com" />
              {errors.email && <p className="text-bordo text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-2">Observações</label>
              <Textarea {...register('notes')} placeholder="Detalhes da encomenda, horário preferencial, etc." rows={4} />
              {errors.notes && <p className="text-bordo text-sm mt-1">{errors.notes.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> A preparar...</>
              ) : (
                'Finalizar Encomenda'
              )}
            </Button>
          </form>
        </div>

        {/* Resumo da Encomenda */}
        <div className="lg:pl-8 lg:border-l border-cacau/10">
          <h2 className="text-2xl font-display text-espresso mb-8">A sua encomenda</h2>
          <div className="space-y-6">
            {items.map(item => (
              <div key={item.productId} className="flex gap-4">
                <img src={item.image} alt={item.productName} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-medium text-espresso">{item.productName}</h3>
                  <p className="text-sm text-cacau">{formatCurrency(item.unitPrice)}</p>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-cacau/20 rounded-md">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1 px-2 hover:bg-espuma">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1 px-2 hover:bg-espuma">
                        <Plus size={14} />
                      </button>
                    </div>

                    <button onClick={() => removeItem(item.productId)} className="text-cacau hover:text-bordo">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="font-semibold text-espresso">
                  {formatCurrency(item.subtotal)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-cacau/10 flex justify-between items-center">
            <span className="text-lg text-cacau">Total</span>
            <span className="text-2xl font-display font-semibold text-espresso">{formatCurrency(total())}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
