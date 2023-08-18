/********************
 * API REST
 * PARA APLICAÇÃO
 * DE NOTAS SIMPLES
 ********************/

import { Response } from 'express';
import { Request } from 'express';

import { uri } from '../configs/mongo';

/* API dos dados */
import { Nota } from '../models/schemas';
import { Resposta } from '../models/respostas';

const postCriar = ( req: Request , res: Response ) =>
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

const getVisualizar = ( req: Request, res: Response ) =>
{
	const { titulo } = req.query;

	if ( typeof titulo != "string" )
	{
		let resposta = new Resposta( { stat: '400', info: 'Má requisição para consulta' } );
		res.status(400).json( resposta.mandar );
	}

	( async ()=>
	{
		try
		{
			let dados: Object[] | string[];
			const inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: titulo } );

			if ( typeof(titulo) == 'undefined' || titulo == '' )
			{
				/* Busca de títulos no banco de dados */
				dados = await inst.procurar();
				await inst.fechar();

				let resposta = new Resposta( { stat: '200', dados: dados } );
				res.status(200).json( resposta.mandar );
			}
			else
			{
				/* retorno de matriz de objetos. */
				dados = await inst.procurar();
				await inst.fechar();

				let resposta = new Resposta( { stat: '200', dados: dados } );
				res.status(200).json( resposta.mandar );
			}
		}
		catch ( erro )
		{
			console.log( erro );

			let resposta = new Resposta( { stat: '500', info: 'Erro interno do servidor impediu a obenção do recurso' } );
			res.status(500).json( resposta.mandar );
		}
		
	}
	)();
};

const delRemover = ( req: Request, res: Response ) =>
{
	const { titulo } = req.body;

	if ( typeof titulo == 'undefined' )
	{
		let resposta = new Resposta( { stat: '400', info: 'Má requisição de deleção' } );
		res.status(400).json( resposta.mandar );
	}

	( async ()=>
	{
		try
		{
			const inst = new Nota( { uri: uri, database: "anotacoes", colecao:"notas", titulo: titulo}  );

			await inst.deletar();
			await inst.fechar();

			let resposta = new Resposta( { stat: '200', info: 'Recurso deletado' } );
			res.status(200).json( resposta.mandar );
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

const putEditar = ( req: Request, res: Response ) =>
{
	const { tituloriginal, titulo, corpo } = req.body;

	const entrada = [ tituloriginal, titulo, corpo ];
	for ( let elemento of entrada )
	{
		if ( typeof elemento == 'undefined' )
		{
			let resposta = new Resposta( { stat: "400", info: "Má requisição de Edição: {tituloriginal, titulo, corpo}" } );
			res.status(400).json( resposta.mandar );
		}
	}

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

const patchEditar = ( req: Request, res: Response ) =>
{
	let resposta = new Resposta( { stat: '501', info: "Edição parcial não implementada" } );
	res.status(501).json( resposta.mandar );
};

export { postCriar, getVisualizar, delRemover, putEditar, patchEditar };
