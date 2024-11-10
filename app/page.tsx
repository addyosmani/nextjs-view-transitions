'use client';

import { MovieGrid } from '@/components/movie-grid';
import { getPopularMovies } from '@/lib/tmdb';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Movie, MoviesResponse } from '@/lib/tmdb';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMovies(pageNum: number) {
    setLoading(true);
    try {
      const data: MoviesResponse = await getPopularMovies(pageNum);
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      loadMovies(nextPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-white mb-8">Popular Movies</h2>
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
    </div>
  );
}