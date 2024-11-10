const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface MovieCredits {
  cast: CastMember[];
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function getPopularMovies(page = 1): Promise<MoviesResponse> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );
  return res.json();
}

export async function getMovieDetails(id: string) {
  const [details, credits] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`).then(res => res.json()),
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`).then(res => res.json())
  ]);
  
  return {
    ...details,
    credits: credits as MovieCredits
  };
}

export async function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  return res.json();
}

export function getImageUrl(path: string | null, size: string = 'original') {
  if (!path) return '/placeholder-avatar.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
