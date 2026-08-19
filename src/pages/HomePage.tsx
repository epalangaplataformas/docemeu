import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import { useOrderStore } from '@/stores/orderStore';
import { ArrowRight, Plus } from 'lucide-react';

export function HomePage() {
  const addItem = useOrderStore(s => s.addItem);
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80"
            alt="Doce Meu Confeitaria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-espresso/80 via-espresso/30 to-transparent" />
        </div>

        <div className="container-editorial relative z-10 mt-auto mb-20">
          <p className="text-dourado tracking-[0.2em] text-sm font-medium mb-4 uppercase">
            Doçaria Portuguesa • Coimbra
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-light text-marfim max-w-3xl leading-tight">
            Sabores que <br />contam histórias.
          </h1>
          <p className="text-marfim/80 text-lg mt-6 max-w-xl">
            Doçaria artesanal, café e chá num espaço onde a tradição portuguesa encontra o prazer de estar à mesa.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button size="lg" variant="gold">
              <Link to="/menu">Ver o Menu</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-marfim text-marfim hover:bg-marfim hover:text-espresso">
              <Link to="/encomendar">Encomendar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* INTRODUÇÃO */}
      <section className="py-24 md:py-32">
        <div className="container-editorial grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-dourado uppercase tracking-widest text-sm mb-4">Bem-vindo</p>
            <h2 className="text-4xl md:text-5xl font-display text-espresso mb-6 leading-tight">
              Um lugar doce no coração de Coimbra.
            </h2>
            <p className="text-cacau text-lg leading-relaxed mb-8">
              Na Doce Meu, cada doce é uma homenagem à doçaria conventual portuguesa. Combinamos métodos artesanais com ingredientes selecionados para criar experiências memoráveis, num espaço pensado para o aconchego e a partilha.
            </p>
            <Button variant="default">
              <Link to="/sobre">
                Conheça a nossa história <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="relative h-125 rounded-lg overflow-hidden shadow-xl">
            <img src="/doce-meu-inter.webp" alt="Interior Doce Meu" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="py-24 bg-marfim">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <p className="text-dourado uppercase tracking-widest text-sm mb-4">Especialidades</p>
            <h2 className="text-4xl md:text-5xl font-display text-espresso">As nossas recomendações</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <article key={product.id} className="group bg-espuma rounded-lg overflow-hidden border border-cacau/10 transition-all hover:shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-dourado uppercase tracking-wider">{product.category}</span>
                  <h3 className="text-2xl font-display text-espresso mt-2 mb-3">{product.name}</h3>
                  <p className="text-cacau text-sm mb-6">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-espresso">{formatCurrency(product.price)}</span>
                    <Button size="sm" variant="outline" onClick={() => addItem(product, 1)}>
                      <Plus size={14} className="mr-1" /> Adicionar
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="ghost">
              <Link to="/menu">Ver menu completo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA ENCOMENDAR */}
      <section className="relative py-32 bg-espresso text-marfim overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/doces.webp" alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="container-editorial relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-light mb-6">Pronto para adoçar o seu dia?</h2>
          <p className="text-marfim/70 text-lg max-w-xl mx-auto mb-10">
            Faça a sua encomenda online e levante na nossa confeitaria em Coimbra.
          </p>
          <Button size="lg" variant="gold">
            <Link to="/encomendar">Iniciar Encomenda</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
