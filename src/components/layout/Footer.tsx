import { Link } from 'react-router';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { RiInstagramLine } from '@remixicon/react';
import { businessInfo } from '@/data/business';

export function Footer() {
  return (
    <footer className="bg-espresso text-marfim/80 pt-20 pb-10 mt-auto">
      <div className="container-editoral max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Coluna da Marca */}
          <div className="md:col-span-1">
            <h3 className="font-display text-3xl text-marfim mb-4">Doce Meu</h3>
            <p className="text-sm leading-relaxed text-marfim/60">
              Confeitaria artesanal e salão de chá no coração de Coimbra. Tradição portuguesa em cada doce.
            </p>
          </div>

          {/* Coluna de Navegação */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-dourado mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-dourado transition-colors text-sm">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-dourado transition-colors text-sm">Sobre Nós</Link></li>
              <li><Link to="/menu" className="hover:text-dourado transition-colors text-sm">Menu</Link></li>
              <li><Link to="/encomendar" className="hover:text-dourado transition-colors text-sm">Encomendar</Link></li>
              <li><Link to="/contactos" className="hover:text-dourado transition-colors text-sm">Contactos</Link></li>
            </ul>
          </div>

          {/* Coluna de Contacto */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-dourado mb-4">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-dourado mt-1 shrink-0" />
                <span>{businessInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-dourado shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-dourado transition-colors">{businessInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-dourado shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-dourado transition-colors">{businessInfo.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-dourado mt-1 shrink-0" />
                <span>{businessInfo.hours}</span>
              </li>
            </ul>
          </div>

          {/* Coluna de Social / Placeholder Decorativo */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-widest text-dourado mb-4">Siga-nos</h4>
            <a
              href={`https://instagram.com/${businessInfo.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-dourado transition-colors group"
            >
              <RiInstagramLine size={20} className="text-marfim/70 group-hover:text-dourado transition-colors" />
              {businessInfo.instagram}
            </a>
          </div>

        </div>

        {/* Linha Inferior */}
        <div className="border-t border-marfim/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-marfim/50">
            © {new Date().getFullYear()} Doce Meu. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-marfim/50">
            <a href="#" className="hover:text-dourado transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-dourado transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
