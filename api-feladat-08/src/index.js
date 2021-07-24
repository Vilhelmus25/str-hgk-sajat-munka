require('dotenv').config();
const app = require('./server');      // ez egy express fv, ami létrehozza az alkalmazásunkat.
const logger = require('./config/logger');
// bNfjqsuyFOmKksaa                                 // ez a jelszó

const port = process.env.PORT || 3000;

// Database connection.
if (!config.has('database')) {
    logger.error('No database config found.');
    process.exit();
}


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});


// így teszteljük a post create-et a böngésző konzoljában:

// fetch('http://localhost:3000/person', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({first_name: 'Jack', last_name: 'London', email: 'jl@gmail.com'})
// }).then( r=> r.json() )
// .then( d => console.log(d) );