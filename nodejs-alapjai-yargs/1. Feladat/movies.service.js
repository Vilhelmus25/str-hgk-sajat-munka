const MoviesService = async (moviesApi) => {                  // kiemeltük a service-t egy fv-be
    let movies = await moviesApi.get()                      // itt kérdezzük le az adatokat, és megvárjuk, hogy lejöjjenek a filmek

    const getAllMovies = () => movies

    const findMovieById = (id) => movies.find(movie => movie.id === id)

    const generateNewMovieId = () => {
        const sortedMovies = [...movies].sort((a, b) => a.id > b.id)        // sorbarendezés id alapján, majd hozzácsapjuk
        return sortedMovies[sortedMovies.length - 1].id + 1
    }            // az id-t növeljük eggyel

    const createMovie = async ({ producer, title }) => {
        const movie = { id: generateNewMovieId(), producer, title }                               // az új movie object
        movies = [...movies, movie]                                         // spread operator, a teljes objectet lecseréli erre az újra, olyan mint egy push
        await moviesApi.save(movies)                                              // mentés
        return movie
    }

    const editMovie = async ({ id, title, producer }) => {
        movies = movies.map(movie => movie.id === id ? { id, producer, title } : movie)     // ha stimmel a movie id-ja a paraméterül kapottéval, akkor módosítani kell ezt a moviet, különben, dobjuk vissza az eredeti movie-t, mert nem kellett módosítani
        await moviesApi.save(movies)
        return findMovieById(id)
    }

    const removeMovie = async (id) => {
        movies = movies.filter(movie => movie.id !== id)        // adja vissza az összeset, aminek az id-ja nem egyezik a megadottéval
        await moviesApi.save(movies)
    }
    return {
        getAllMovies,
        findMovieById,
        createMovie,
        editMovie,
        removeMovie
    }
}

module.exports = MoviesService                      // ha egy elem van, akkor nem kell az Object.freeze !!