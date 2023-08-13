/***********************
 * UTILITÁRIOS
 ***********************/

const express = require('express');

// GLOBAIS PARA TODAS REQUISIÇÕES app.use();

/** emite linha de log para cada requisição recebida */
const uriLog = ( req, res, next )=>
{
	const t = new Date();
	console.log( `REQUISIÇÃO de ${req.ip} do recurso ${req.path} de método ${req.method} - ${t.toString()}` );
	next();
};

// LOCAIS À ROTAS ESPECÍFICAS antes do controller.

const mostrarUrl = ( req, res, next )=>
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

module.exports =
{
	uriLog,
	mostrarUrl
};
