/********************
 * API REST
 * PARA APLICAÇÃO
 * DE NOTAS SIMPLES
 ********************/

import express from 'express';
import { uri } from '../configs/mongo';

/* API dos dados */
import { Nota } from '../models/schemas';
import { Resposta } from '../models/respostas';

const postCriar = ( req: express.Request , res: express.Response ) =>
{
	const { titulo, corpo } = req.body;

	//narrowing
	if ( typeof titulo != 'string' || typeof corpo != 'string' )
	{
		let resposta = new Resposta( { stat: "400", info: "Má requisição de criação" } );
		res.status(400).json( resposta.mandar );
	}

	( async ()=>
	{
		try
		{
			const inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: titulo, corpo: corpo }  );

			await inst.salvar();
			await inst.fechar();
			
			let resposta = new Resposta( { stat: '201', info: 'Novo recurso criado' } );
			res.status(200).json( resposta.mandar );
		}
		catch ( erro )
		{
			console.log( erro );
			let resposta = new Resposta( { stat: '500', info: 'Erro interno do servidor impediu a criação do recurso' } );
			res.status(500).json( resposta.mandar );
		}

	}
	)();
};

const getVisualizar = ( req: express.Request, res: express.Response ) =>
{
	const { titulo } = req.query;

	( async ()=>
	{
		try
		{
			let dados: Object[] | string[];
			let inst;

			if ( typeof titulo == 'string' )
			{
				//query
 				inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: titulo } );

				/* retorno da matriz de objetos */
				dados = await inst.procurar();
				await inst.fechar();

				let resposta = new Resposta( { stat: '200', dados: dados } );
				res.status(200).json( resposta.mandar );

			}
			else
			{
				//todos títulos
 				inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: '' } );

				/* retorno de matriz de strings. */
				dados = await inst.procurar();
				await inst.fechar();

				let resposta = new Resposta( { stat: '200', dados: dados } );
				res.status(200).json( resposta.mandar );
			}
		}
		catch ( erro )
		{
			console.log( erro );

			let resposta = new Resposta( { stat: '500', info: 'Erro interno do servidor impediu a obtenção do recurso' } );
			res.status(500).json( resposta.mandar );
		}
		
	}
	)();
};

const delRemover = ( req: express.Request, res: express.Response ) =>
{
	const { titulo } = req.body;


	( async ()=>
	{
		try
		{

			if ( typeof titulo == 'undefined' )
			{
				let resposta = new Resposta( { stat: '400', info: 'Má requisição de deleção' } );
				res.status(400).json( resposta.mandar );
			}
			else
			{
				const inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: titulo }  );

				await inst.deletar();
				await inst.fechar();

				let resposta = new Resposta( { stat: '200', info: 'Recurso deletado' } );
				res.status(200).json( resposta.mandar );
			}
		}
		catch ( erro )
		{
			console.log( erro );
			let resposta = new Resposta( { stat: '500', info: 'Erro interno do servidor impediu a deleção do recurso' } );
			res.status(500).json( resposta.mandar );
		}
	}
	)();
};

const putEditar = ( req: express.Request, res: express.Response ) =>
{
	const { tituloriginal, titulo, corpo } = req.body;

	( async ()=>
	{


		try
		{
			const inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: titulo}  );

			await inst.editar( tituloriginal );
			await inst.fechar();

			let resposta = new Resposta( { stat: '200', info: 'Recurso modificado' } );
			res.status(200).json( resposta.mandar );
		}
		catch ( erro )
		{
			console.log( erro );
			let resposta = new Resposta( { stat: '500', info: 'Erro interno do servidor impediu a edição do recurso' } );
			res.status(500).json( resposta.mandar );
		}
	}
	)();
};

const patchEditar = ( req: express.Request, res: express.Response ) =>
{
	let resposta = new Resposta( { stat: '501', info: "Edição parcial não implementada" } );
	res.status(501).json( resposta.mandar );
};

export { postCriar, getVisualizar, delRemover, putEditar, patchEditar };
