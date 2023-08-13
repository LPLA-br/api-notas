/****************************
 * CONFIGURAÇÃO DO EXPRESS
 ****************************/
const express = require('express');
const app = express();

const PORTA = 8080;

const rota = require('../routes/tudo');
const { uriLog } = require( '../middlewares/utilitarios' );

app.name = 'Api-notas®';

//middlewares acopláveis de terceiros
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

//rotas
app.use( '/', rota );

//middlewares globais
app.use( uriLog );

module.exports = { app, PORTA };
