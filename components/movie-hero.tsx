import { MovieDetails, getImageUrl } from '@/lib/tmdb';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Clock, Calendar, Star } from 'lucide-react';

export function MovieHero({ movie }: { movie: MovieDetails }) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
      </div>

      <div className="relative z-10 grid gap-8 pt-32 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
        <div className="mx-auto w-full max-w-[300px] lg:max-w-[400px]">
          <AspectRatio ratio={2/3} className="overflow-hidden rounded-lg">
            <Image
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              fill
              className="object-cover"
              style={{ viewTransitionName: `movie-${movie.id}` }}
              sizes="(max-width: 768px) 300px, 400px"
              priority
            />
          </AspectRatio>
        </div>

        <div className="space-y-6 px-4 md:px-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl text-muted-foreground">{movie.tagline}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{movie.runtime} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-lg leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}