/********************
 * API REST
 * PARA APLICAÇÃO
 * DE NOTAS SIMPLES
 ********************/

const express = require('express');
const { uri } = require('../configs/mongo');

/* API dos dados */
const { Nota } = require('../models/schemas');

const postCriar = ( req, res ) =>
{
	const { titulo, corpo } = req.body;


	( async ()=>
	{
		try
		{
			const inst = new Nota( uri , "anotacoes", "notas", titulo, corpo );
			await inst.salvar();
			await inst.fechar();
			res.status(200).json( { stat: "ok" } );
		}
		catch ( erro )
		{
			console.log( erro );
			res.status(500).json( { stat: "erro", info: "{titulo:String,Corpo:String} body" } );
		}

	}
	)();
};

const getVisualizar = ( req, res ) =>
{
	const { titulo } = req.query;

	( async ()=>
	{
		try
		{
			let dados;
			const inst = new Nota( uri , "anotacoes", "notas", (typeof(titulo) == 'undefined' ? '' : titulo) );

			if ( typeof(titulo) == 'undefined' || titulo == '' )
			{
				//retorno de titulos pelo método.
				dados = await inst.procurar();
				await inst.fechar();
				res.status(200).json( { titulos: dados } );
			}
			else
			{
				//retorno de matriz de objetos.
				dados = await inst.procurar();
				await inst.fechar();
				res.status(200).json( { titulo: dados?.titulo, corpo: dados?.corpo } );
			}
		}
		catch ( erro )
		{
			console.log( erro );
			res.status(500).json( { stat: "erro", info:"{titulo:String} query" } );
		}
		
	}
	)();
};

const delRemover = ( req, res )=>
{
	const { titulo } = req.body;

	( async ()=>
	{
		try
		{
			const inst = new Nota( uri , "anotacoes", "notas", titulo );
			await inst.deletar();
			await inst.fechar();
			res.status(200).json( { stat: 'ok' } );
		}
		catch ( erro )
		{
			console.log( erro );
			res.status(500).json( { stat: "erro", info:"{titulo:String} body" } );
		}
	}
	)();
};

const putEditar = ( req, res )=>
{
	const { tituloriginal, titulo, corpo } = req.body;

	( async ()=>
	{
		try
		{
			const inst = new Nota( uri , "anotacoes", "notas", titulo, corpo );
			await inst.editar( tituloriginal );
			await inst.fechar();
			res.status(200).json( { stat: 'ok' } );
		}
		catch ( erro )
		{
			console.log( erro );
			res.status(200).json( { stat: "erro", info: "{tituloriginal:String,titulo:String,corpo:String} body" } );
		}
	}
	)();
};

const patchEditar = ( req, res )=>
{
	res.status(501).json( { stat: "erro: não implementado",  } );
};

module.exports =
{
	postCriar,
	getVisualizar,
	delRemover,
	putEditar,
	patchEditar
};
