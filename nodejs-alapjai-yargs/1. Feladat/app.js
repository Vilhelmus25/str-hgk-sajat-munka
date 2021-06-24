const yargs = require('yargs')
const { id, producer, title } = require('./option')
const MoviesApi = require('./movies.api')
const MoviesService = require('./movies.service')

const moviesApi = MoviesApi('./database/movies.json', 'movies');             // a .json nem kötelező, de maradhat. A movies az a prop
(async () => {                      // az async get miatt a service-ben mivel ott várakozik, ezek nem jönnek létre, de így már igen
    const {
        getAllMovies,
        findMovieById,
        createMovie,
        editMovie,
        removeMovie
    } = await MoviesService(moviesApi)      // az await-re megváltozott a fentiek színe
    // tehát a probléma ott volt, hogy meg kell várni, hogy a get és a save lefussanak, akkor promisosítanom kell a servicet is ami az api-t használja.
    // itt is várni kell

    yargs
        .version('1.0.0')
        .usage('Usage: <command> [options]')        // ide fogja a parancs helyét behelyettesíteni 
        // .command('get', 'Get all movies', () => console.log(movies))
        .command({
            command: 'get',
            describe: 'Get all movies',
            handler: () => console.log(getAllMovies())                  // ide is kellhetne, mert az elején egyszer beolvassuk, de ha törlés van közben, illene újra beolvasni.
        })
        .command({
            command: 'find',
            describe: 'Find a movie by id',
            builder: { id },
            handler: ({ args }) =>
                console.log(findMovieById(args.id))

        })
        .command({
            command: 'create',
            describe: 'Create a new movie',
            builder: { producer, title },
            handler: async (args) => {                                     // egy arrow function a handler
                console.log(await createMovie(args))

            }
        })
        .command({
            command: 'edit',
            describe: 'Edit a movie',
            builder: { id, producer, title },
            handler: async (args) => {
                console.log(await editMovie(args))
            }
        })
        .command({
            command: 'remove',
            describe: 'Remove a movie by ID',
            builder: { id },
            handler: async (args) => {
                await removeMovie(args.id)
                console.log('deleted')
            }
        })
        .locale('en')                               // ez az alapértelmezett, a helper nyelve
        .strict()
        .help()
        .parse()                                    // process.args helyett, csak args-ként tudunk hivatkozni a parancsokra. 



})()                // és azonnal meghívjuk


