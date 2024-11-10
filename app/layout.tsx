import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import { SearchBar } from '@/components/search-bar';
import { Link } from 'next-view-transitions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TMDB Movies',
  description: 'Browse and search movies using TMDB API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-white">
                    <Link 
                      href="/" 
                      className="hover:text-gray-300 transition"
                      scroll={false}
                    >
                      TMDB Movies
                    </Link>
                  </h1>
                  <SearchBar />
                </div>
              </div>
            </nav>
            {children}
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}