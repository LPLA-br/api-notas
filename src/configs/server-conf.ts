/********************************
 * CONFIGURAÇÃO DO SERVIDOR
 ********************************/

import express from 'express';
import { router } from '../routes/tudo';
import { uriLog } from '../middlewares/utilitarios';

const app = express();
const PORTA = 8080;

app.set( 'name', 'Api-notas' ); 

/* middlewares auxiliares ao express */
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

/* rotas */
app.use( '/', router );

/* middlewares globais */
app.use( uriLog );

export { app, PORTA };
