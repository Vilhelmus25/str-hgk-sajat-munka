const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());
app.use('/person', require('./controllers/person/routes'))

app.use((err, req, res, next) => {          // ez a hiba le kezelése, akkor amikor ha mégis meghívodna
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: "Véletlen volt...!"                 // le is kezeltem és vissza is küldtem a választ
    });
})


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
