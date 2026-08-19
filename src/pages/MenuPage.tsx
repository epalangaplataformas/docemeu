import { useState } from 'react';
import { products } from '@/data/products';
import { useOrderStore } from '@/stores/orderStore';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle2 } from 'lucide-react';
import type { ProductCategory } from '@/schemas';

const categoryLabels: Record<ProductCategory | 'all', string> = {
  all: 'Todos',
  bolos: 'Bolos',
  docaria: 'Doçaria',
  biscoitos: 'Biscoitos',
  bebidas: 'Chá & Café',
  especialidades: 'Especialidades'
};

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const addItem = useOrderStore(s => s.addItem);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAdd = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem(product, 1);
      setAddedItems(prev => ({ ...prev, [productId]: true }));
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [productId]: false }));
      }, 1500);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-espuma">
      <div className="container-editorial">
        {/* Cabeçalho do Menu */}
        <div className="text-center mb-16">
          <p className="text-dourado uppercase tracking-widest text-sm mb-4">O Nosso Cardápio</p>
          <h1 className="text-5xl md:text-6xl font-display text-espresso mb-6">Sabores Artesanais</h1>
          <p className="text-cacau max-w-2xl mx-auto text-lg">
            Cada item é preparado com dedicação, usando receitas tradicionais portuguesas e ingredientes selecionados.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {(Object.keys(categoryLabels) as Array<ProductCategory | 'all'>).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                ? 'bg-espresso text-marfim shadow-md'
                : 'bg-marfim text-cacau border border-cacau/20 hover:border-espresso'
                }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grelha de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map(product => (
            <article
              key={product.id}
              className="bg-marfim rounded-lg overflow-hidden border border-cacau/10 transition-all duration-300 hover:shadow-xl group flex flex-col"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-marfim/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs uppercase tracking-wider text-espresso font-medium">
                    {categoryLabels[product.category]}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-display text-espresso mb-2">{product.name}</h3>
                <p className="text-cacau text-sm mb-6 flex-1">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-semibold text-espresso font-display">
                    {formatCurrency(product.price)}
                  </span>
                  <Button
                    size="sm"
                    variant={addedItems[product.id] ? "gold" : "outline"}
                    onClick={() => handleAdd(product.id)}
                    disabled={addedItems[product.id]}
                  >
                    {addedItems[product.id] ? (
                      <><CheckCircle2 size={14} className="mr-1" /> Adicionado</>
                    ) : (
                      <><Plus size={14} className="mr-1" /> Adicionar</>
                    )}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
