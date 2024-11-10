import { MovieDetails as MovieDetailsType, CastMember } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { Star, Clock, User2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export function MovieDetails({ movie }: { movie: MovieDetailsType & { credits: { cast: CastMember[] } } }) {
  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Hero Section */}
        <div
          className="absolute inset-0 h-[50vh] md:h-[60vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/30" />
        </div>

        {/* Content */}
        <div className="relative pt-24 px-4 md:pt-32 lg:pt-40 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full max-w-[300px] mx-auto md:mx-0 md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  style={{ viewTransitionName: `poster-${movie.id}` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-white space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-lg md:text-xl text-gray-300 italic">
                    {movie.tagline}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm md:text-base">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 mr-1" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="text-gray-300">
                  {movie.release_date.split('-')[0]}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-12 md:mt-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg pb-4">
          <div className="flex space-x-4">
            {movie.credits.cast.slice(0, 20).map((member) => (
              <div
                key={member.id}
                className="flex-shrink-0 w-32 text-center"
              >
                <div className="aspect-[2/3] mb-2">
                  {member.profile_path ? (
                    <img
                      src={getImageUrl(member.profile_path, 'w185')}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gray-800 flex items-center justify-center">
                      <User2 className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-white text-sm truncate px-2">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-xs truncate px-2">
                  {member.character}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}