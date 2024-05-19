const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet.hidePoweredBy());
// evita uso indevido do site em iframes
app.use(helmet.frameguard({action: 'deny'}))
//evita XSS atack
app.use(helmet.xssFilter())
//força a requisição a informar o 'Content-type'
app.use(helmet.noSniff())
//evita que o IE execute downloads de html no contexto do site
app.use(helmet.ieNoOpen())
//diz ao browser para usar HTTPS evitando protocol downgrade
const timeInSeconds = 90 * 24 * 60 * 60
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}))












































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
