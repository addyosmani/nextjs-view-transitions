import { getMovieDetails, getPopularMovies } from '@/lib/tmdb';
import { MovieDetails } from '@/components/movie-details';

// Generate static params for multiple pages of popular movies
export async function generateStaticParams() {
  // Get first 5 pages of movies to ensure we have enough static pages
  const pages = await Promise.all(
    Array.from({ length: 5 }, (_, i) => getPopularMovies(i + 1))
  );
  
  // Combine all movie IDs from all pages
  const movies = pages.flatMap(page => page.results);
  
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);
  return <MovieDetails movie={movie} />;
}