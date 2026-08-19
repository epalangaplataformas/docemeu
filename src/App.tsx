import { Routes, Route } from 'react-router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyOrderBar } from '@/components/ordering/StickyOrderBar';
import { HomePage } from '@/pages/HomePage';
import { MenuPage } from '@/pages/MenuPage';
import { EncomendarPage } from '@/pages/EncomendarPage';
import { SobrePage } from '@/pages/SobrePage';
import { ContactosPage } from '@/pages/ContactosPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-espuma">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/encomendar" element={<EncomendarPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
        </Routes>
      </main>
      <Footer />
      <StickyOrderBar />
    </div>
  );
}
