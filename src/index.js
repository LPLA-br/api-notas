const { app, PORTA } = require('./configs/expconf'); 

app.listen( PORTA, ()=>{ console.log( `EXCUTANDO PORTA: ${PORTA}` ) } );
