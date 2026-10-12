import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Website Bazer BD — Digital Website Marketplace',
  description: 'Buy and sell website templates, full-stack source codes, scripts, and complete web applications in Bangladesh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
