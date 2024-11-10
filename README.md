# TMDB Movies Explorer

A Next.js View Transtions demo using Next.js and [shuding/next-view-transitions](https://github.com/shuding/next-view-transitions). This features real-time search, movie details, and cast information powered by TMDB API.

## Features

- 🎬 Browse popular movies 
- 🔍 Real-time movie search
- 🎯 Detailed movie information including cast, ratings, and runtime
- 🎨 Beautiful UI with smooth transitions
- 📱 Fully responsive design
- ⚡ Fast page loads with static generation

## Tech Stack

- **Framework**: Next.js 13
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: View Transitions API
- **Data**: TMDB API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --force
   ```
3. Create a `.env.local` file with your TMDB API key:
   ```
   TMDB_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   ├── search/        # Search functionality
│   └── movie/         # Movie details
├── components/        # React components
│   ├── movie-card.tsx
│   ├── movie-grid.tsx
│   └── ui/           # shadcn/ui components
├── lib/              # Utilities and API
└── public/           # Static assets
```

## API Integration

The application uses the TMDB API for movie data. Key endpoints:

- `/movie/popular` - Popular movies listing
- `/movie/{id}` - Movie details
- `/search/movie` - Movie search

## Performance

- Static page generation for popular movies
- Lazy loading of images
- Infinite scroll for pagination
- Client-side caching

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)