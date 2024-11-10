'use client';

import { MovieGrid } from '@/components/movie-grid';
import { searchMovies } from '@/lib/tmdb';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Movie, MoviesResponse } from '@/lib/tmdb';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMovies(pageNum: number) {
    if (!query) return;
    
    setLoading(true);
    try {
      const data: MoviesResponse = await searchMovies(query, pageNum);
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [query]);

  const loadMore = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      loadMovies(nextPage);
    }
  };

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-white mb-8">
          Please enter a search term
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        Search Results for "{query}"
      </h2>
      {movies.length === 0 && !loading ? (
        <p className="text-white text-lg">No movies found for "{query}"</p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          {page < totalPages && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={loadMore}
                disabled={loading}
                variant="secondary"
                size="lg"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}