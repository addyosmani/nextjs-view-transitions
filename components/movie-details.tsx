import { MovieDetails as MovieDetailsType, CastMember } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { Star, Clock, User2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export function MovieDetails({ movie }: { movie: MovieDetailsType & { credits: { cast: CastMember[] } } }) {
  return (
    <div className="pt-16">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
            <div className="w-64 flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="rounded-lg shadow-xl"
                style={{ viewTransitionName: `poster-${movie.id}` }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 mb-4 italic">
                  {movie.tagline}
                </p>
              )}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 mr-1" />
                  <span className="text-lg">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="text-gray-300">
                  {movie.release_date.split('-')[0]}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex space-x-4 p-4">
            {movie.credits.cast.slice(0, 20).map((member: CastMember) => (
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
                <h3 className="font-medium text-white text-sm">{member.name}</h3>
                <p className="text-gray-400 text-xs">{member.character}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}