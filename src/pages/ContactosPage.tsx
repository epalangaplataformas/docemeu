import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/schemas';
import { businessInfo } from '@/data/business';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { RiInstagramLine } from '@remixicon/react';

export function ContactosPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log('Dados do formulário de contacto:', data);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-espuma">
      <div className="container-editorial">
        <div className="text-center mb-16">
          <p className="text-dourado uppercase tracking-widest text-sm mb-4">Estamos Aqui</p>
          <h1 className="text-5xl md:text-6xl font-display text-espresso mb-6">Visite-nos</h1>
          <p className="text-cacau max-w-2xl mx-auto text-lg">
            Tem alguma dúvida ou pretende encomendar algo especial? Entre em contacto connosco.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Coluna Esquerda: Informação e Mapa */}
          <div>
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-marfim p-3 rounded-full border border-cacau/10">
                  <MapPin className="text-dourado" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display text-espresso mb-1">Morada</h3>
                  <p className="text-cacau">{businessInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-marfim p-3 rounded-full border border-cacau/10">
                  <Clock className="text-dourado" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display text-espresso mb-1">Horário</h3>
                  <p className="text-cacau">{businessInfo.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-marfim p-3 rounded-full border border-cacau/10">
                  <Phone className="text-dourado" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display text-espresso mb-1">Telefone</h3>
                  <p className="text-cacau">{businessInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-marfim p-3 rounded-full border border-cacau/10">
                  <Mail className="text-dourado" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display text-espresso mb-1">Email</h3>
                  <p className="text-cacau">{businessInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-marfim p-3 rounded-full border border-cacau/10">
                  <RiInstagramLine className="text-dourado" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-display text-espresso mb-1">Instagram</h3>
                  <a href={`https://instagram.com/${businessInfo.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-cacau hover:text-espresso transition-colors">
                    {businessInfo.instagram}
                  </a>
                </div>
              </div>
            </div>

            {/* Placeholder do Mapa do Google */}
            <div className="w-full h-64 bg-marfim rounded-lg overflow-hidden border border-cacau/10 relative">
              <iframe
                title="Localização Doce Meu"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12070.055843093975!2d-8.4291066!3d40.2084703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd22fbb7e6e1c79b%3A0x0!2sCoimbra!5e0!3m2!1spt-PT!2spt!4v1700000000000"
                className="w-full h-full grayscale-[0.2] contrast-[0.9]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="bg-marfim p-8 md:p-10 rounded-lg border border-cacau/10">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <CheckCircle2 size={64} className="text-salvia mb-6" />
                <h2 className="text-3xl font-display text-espresso mb-4">Mensagem Enviada!</h2>
                <p className="text-cacau mb-8 max-w-sm">
                  Obrigado pelo seu contacto. Responderemos o mais brevemente possível.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-display text-espresso mb-8">Envie-nos uma mensagem</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-espresso mb-2">Nome *</label>
                    <Input {...register('name')} placeholder="O seu nome" />
                    {errors.name && <p className="text-bordo text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-2">Email *</label>
                    <Input {...register('email')} type="email" placeholder="email@exemplo.com" />
                    {errors.email && <p className="text-bordo text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-2">Assunto *</label>
                    <Input {...register('subject')} placeholder="Sobre o que pretende falar?" />
                    {errors.subject && <p className="text-bordo text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-2">Mensagem *</label>
                    <Textarea {...register('message')} rows={5} placeholder="Escreva aqui a sua mensagem..." />
                    {errors.message && <p className="text-bordo text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-marfim/30 border-t-marfim rounded-full animate-spin"></span>
                        A enviar...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Enviar Mensagem <Send size={16} />
                      </span>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
