'use client';
import { MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'd like to enquire about Anupam Paints products.`;
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
      aria-label="Chat on WhatsApp">
      <MessageCircle size={28} />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
