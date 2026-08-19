import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';
import { MapPin } from 'lucide-react';

export function SobrePage() {
  return (
    <div className="pt-20">
      {/* Secção de História */}
      <section className="py-24 md:py-32 bg-espuma">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-150 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551024601-bec78c2b9f5d?auto=format&fit=crop&q=80"
                alt="Interior Doce Meu"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-dourado uppercase tracking-widest text-sm mb-4">A Nossa História</p>
              <h1 className="text-4xl md:text-5xl font-display text-espresso mb-8 leading-tight">
                Mais do que uma confeitaria.
              </h1>
              <div className="space-y-4 text-cacau text-lg leading-relaxed">
                <p>
                  Nascida no coração de Coimbra, a Doce Meu é um tributo à doçaria conventual portuguesa. Inspirados pelas receitas antigas que marcaram gerações, dedicamo-nos a preservar o saber-fazer tradicional, combinando-o com o conforto de um salão de chá contemporâneo.
                </p>
                <p>
                  Cada bolo, cada pastel e cada chá servido na nossa casa carregam a alma da hospitalidade portuguesa. Acreditamos que os melhores momentos partilham-se à mesa, com sabores autênticos feitos com tempo e dedicação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separador Decorativo Sutil */}
      <div className="bg-marfim py-2 border-y border-cacau/10">
        <div className="container-editorial flex justify-center">
          <div className="w-24 h-px bg-dourado"></div>
        </div>
      </div>

      {/* Secção Salão de Chá */}
      <section className="py-24 md:py-32 bg-marfim">
        <div className="container-editorial grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-dourado uppercase tracking-widest text-sm mb-4">Experiência</p>
            <h2 className="text-4xl md:text-5xl font-display text-espresso mb-8 leading-tight">
              Café, chá e tempo para apreciar.
            </h2>
            <div className="space-y-4 text-cacau text-lg leading-relaxed">
              <p>
                O nosso espaço foi desenhado para o fazer abrandar. Num ambiente acolhedor, convidamos a sentar-se, desligar do relógio e apreciar uma pausa verdadeira.
              </p>
              <p>
                Venha descobrir os nossos blends de chá, o café cuidadosamente extraído e a doçaria que harmoniza com cada gole. É o lugar perfeito para a conversa ou para o silêncio.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-125 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1572286258217-215cf8e2f5b0?auto=format&fit=crop&q=80"
              alt="Salão de Chá Doce Meu"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Secção Coimbra / Localização */}
      <section className="py-24 md:py-32 bg-espresso text-marfim">
        <div className="container-editorial text-center">
          <p className="text-dourado uppercase tracking-widest text-sm mb-4">Coimbra</p>
          <h2 className="text-4xl md:text-5xl font-display mb-8 leading-tight">
            Um pedaço de Coimbra à mesa.
          </h2>
          <p className="text-marfim/70 text-lg max-w-2xl mx-auto mb-12">
            Estamos inseridos na história viva da cidade dos estudantes. Venha visitar-nos e levar consigo uma memória doce de Coimbra.
          </p>

          <div className="inline-flex flex-col items-center gap-2 bg-espresso/50 border border-marfim/20 rounded-lg p-8 backdrop-blur-sm">
            <MapPin size={24} className="text-dourado mb-2" />
            <p className="text-xl font-display">{businessInfo.address}</p>
            <p className="text-marfim/60 text-sm mt-2">{businessInfo.hours}</p>
            <Button variant="gold" className="mt-6">
              <a href={businessInfo.mapsUrl} target="_blank" rel="noreferrer">Visite-nos</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
