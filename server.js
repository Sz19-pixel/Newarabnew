require('dotenv').config();
const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const MovieDB = require('moviedb');

const mdb = new MovieDB(process.env.TMDB_API_KEY);

const manifest = {
    id: 'org.arabic-mneizel.stremio',
    version: '1.0.0',
    name: 'Arabic Mneizel',
    description: 'Stremio addon for Arabic content from vidfast.pro',
    resources: ['stream', 'catalog'],
    types: ['movie', 'series'],
    catalogs: [
        {
            type: 'movie',
            id: 'arabic_movies',
            name: 'Arabic Movies'
        },
        {
            type: 'series',
            id: 'arabic_series',
            name: 'Arabic Series'
        }
    ],
    idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(async (args) => {
    try {
        let metas = [];

        if (args.type === 'movie' && args.id === 'arabic_movies') {
            const movies = await new Promise((resolve, reject) => {
                mdb.discoverMovie({ language: 'ar', sort_by: 'popularity.desc' }, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
            metas = movies.results.map(movie => ({
                id: `tt${movie.id}`,
                type: 'movie',
                name: movie.title,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }));
        }

        if (args.type === 'series' && args.id === 'arabic_series') {
            const series = await new Promise((resolve, reject) => {
                mdb.discoverTv({ language: 'ar', sort_by: 'popularity.desc' }, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
            metas = series.results.map(serie => ({
                id: `tt${serie.id}`,
                type: 'series',
                name: serie.name,
                poster: `https://image.tmdb.org/t/p/w500${serie.poster_path}`
            }));
        }

        return { metas };
    } catch (error) {
        console.error('Error in catalog handler:', error);
        return { metas: [] };
    }
});

builder.defineStreamHandler(async (args) => {
    try {
        if (args.type === 'movie' && args.id) {
            const streamUrl = `https://vidfast.pro/movie/${args.id}`;
            return { streams: [{ url: streamUrl, title: 'vidfast.pro' }] };
        }

        if (args.type === 'series' && args.id) {
            const parts = args.id.split(':');
            if (parts.length === 3) {
                const [imdbId, season, episode] = parts;
                const streamUrl = `https://vidfast.pro/tv/${imdbId}/${season}/${episode}`;
                return { streams: [{ url: streamUrl, title: 'vidfast.pro' }] };
            } else {
                 const streamUrl = `https://vidfast.pro/tv/${args.id}/1/1`;
                 return { streams: [{ url: streamUrl, title: 'vidfast.pro' }] };
            }
        }

        return { streams: [] };
    } catch (error) {
        console.error('Error in stream handler:', error);
        return { streams: [] };
    }
});

const port = process.env.PORT || 3000;

serveHTTP(builder.getInterface(), { port });

console.log(`Addon running on port ${port}`);