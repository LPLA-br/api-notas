/***********************
 * UTILITÁRIOS
 ***********************/

import express from 'express';

// GLOBAIS PARA TODAS REQUISIÇÕES app.use();

/** emite linha de log para cada requisição recebida */
const uriLog = ( req: express.Request, res: express.Response, next: express.NextFunction )=>
{
	const t = new Date();
	console.log( `REQUISIÇÃO de ${req.ip} do recurso ${req.path} de método ${req.method} - ${t.toString()}` );
	next();
};

// LOCAIS ÀS ROTAS ESPECÍFICAS antes do controller.

const mostrarUrl = ( req: express.Request, res: express.Response, next: express.NextFunction )=>
{

	const regexp = new RegExp( "\/[a-z]*\?.*$" );
	try
	{
		console.log( regexp.exec( req.originalUrl )[0] );
	}
	catch ( erro )
	{
		console.log( "EXPRESSÃO REGULAR FALHOU:" );
		console.log( "------------\n", erro, "-------------\n" );
	}
	next();
};

export { uriLog, mostrarUrl };
