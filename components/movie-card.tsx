'use client';

import { Movie } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { Link } from 'next-view-transitions';
import { Star } from 'lucide-react';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-105"
    >
      <div className="aspect-[2/3]">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="h-full w-full object-cover transition-opacity"
          style={{ viewTransitionName: `poster-${movie.id}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
          <div className="flex items-center text-yellow-400 mb-2">
            <Star className="w-4 h-4 mr-1" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-300 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
}