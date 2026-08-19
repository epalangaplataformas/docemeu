import type { Order } from '@/schemas';
import { businessInfo } from '@/data/business';

export interface WhatsAppSendResult {
  success: boolean;
  message: string;
  waLink?: string;
}

export const buildWhatsAppOrderMessage = (order: Order): string => {
  let msg = "Olá, Doce Meu!\n\nGostaria de fazer a seguinte encomenda:\n\n";

  order.items.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.productName}\n`;
    msg += `   Quantidade: ${item.quantity}\n`;
    msg += `   Preço unitário: ${item.unitPrice.toFixed(2).replace('.', ',')} €\n`;
    msg += `   Subtotal: ${item.subtotal.toFixed(2).replace('.', ',')} €\n\n`;
  });

  const total = order.items.reduce((acc, i) => acc + i.subtotal, 0);
  msg += `Total: ${total.toFixed(2).replace('.', ',')} €\n\n`;

  msg += `Dados do cliente:\n`;
  msg += `Nome: ${order.customer.name}\n`;
  msg += `Telefone: ${order.customer.phone}\n`;
  if (order.customer.email) msg += `Email: ${order.customer.email}\n`;
  if (order.customer.notes) msg += `Observações:\n${order.customer.notes}\n`;
  msg += `\nObrigado!`;

  return msg;
};

// Mock WhatsApp Cloud API Service
export const WhatsAppOrderService = {
  sendOrder: async (order: Order): Promise<WhatsAppSendResult> => {
    // Em produção: POST /api/orders/whatsapp -> Meta Graph API
    await new Promise(resolve => setTimeout(resolve, 1200));

    const text = encodeURIComponent(buildWhatsAppOrderMessage(order));
    const waLink = `https://wa.me/${businessInfo.whatsapp}?text=${text}`;

    return {
      success: true,
      message: 'Encomenda preparada com sucesso.',
      waLink
    };
  }
};
