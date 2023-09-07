import { app, PORTA } from './configs/server-conf';

app.listen( PORTA, ()=>{ console.log( `Ouvindo a porta: ${PORTA}` ) } );
