/******************
 * Api para operar
 * os dados.
 ******************/

import { MongoClient } from "mongodb";

/** nota : representa credenciais de acesso ao banco
*   de dados das notas.
*   @interface
*   @property {string} uri - uri de acesso ao database mongo.
*   @property {string} database - database criado por ti no mongo.
*   @property {string} colecao - nome da colecao dentro do database.
*   @property {string | undefined} titulo - titulo da nota.
*   @property {string | undefined} corpo - corpo da nota.
*   */
interface nota
{
	uri: string,
	database: string,
	colecao: string,
	titulo?: string | undefined,
	corpo?: string | undefined
};

/** Classe para insância de notas.
 *  @class
 */
class Nota
{

	private uri: string;
	private client: MongoClient;
	private database: any;
	private colecao: any;
	private titulo: string | undefined;
	private corpo: string | undefined;

	

	/** Instânciação de uma Nota individual
	 *  @constructor
	 *  @param {interface} nota - informações de acesso.
	 */
	constructor( credenciais: nota )
	{
		this.client = new MongoClient( credenciais.uri );

		this.database = this.client.db( credenciais.database );
		this.colecao = this.database.collection( credenciais.colecao );

		this.titulo = credenciais.titulo;
		this.corpo = credenciais.corpo;
	}

	/** Salvar conteúdo construido no database.
	 *  @async
	 *  @method
	 *  @public
	 *  @returns {Promise<void>}
	 */
	public async salvar(): Promise< void >
	{
		try
		{
			await this.colecao.insertOne( { titulo: this.titulo , corpo: this.corpo } );
		}
		catch ( erro )
		{
			console.log( erro, "ERRO: Notas.salvar()" );
		}
	}

	/** Deletar nota no database de acordo com título construido.
	 *  @async
	 *  @method
	 *  @public
	 *  @returns {Promise<void>}
	 */
	public async deletar(): Promise< void >
	{
		try
		{
			await this.colecao.deleteOne( { titulo: this.titulo } );
		}
		catch ( erro )
		{
			console.log( erro, "ERRO: Notas.deletar()" );
		}
	}

	/** Editar nota completamente. sendo ela buscada através
	 *  de seu titulo original.
	 *  Novo título e corpo são passados ao construtor.
	 *  @async
	 *  @method
	 *  @public
	 *  @param {string} tituloriginal - titulo para busca no mongo.
	 * */
	public async editar( tituloriginal: string = '' ): Promise< void >
	{
		try
		{
			await this.colecao.updateOne(
				{ titulo: tituloriginal },
				{ $set: { 'titulo': this.titulo, 'corpo': this.corpo } }
			);
		}
		catch ( erro )
		{
			console.log( erro, "ERRO: Notas.editar" );
		}
	}

	/** Busca nota indicada pelo titulo construido e retorna a consulta.
	 *  Retorna lista de titulos se titulo procurado for igual a ''.
	 *  @async
	 *  @method
	 *  @public
	 *  @return { Promise< Object[] | string[] > } dados da consulta.
	 */
	public async procurar(): Promise< Object[] | string[] >
	{
		if ( this.titulo == '' )
		{
			try
			{
				const cursor: any = this.colecao.find();
				let titulos: Array<string> | Array<Object> = [];
				for await (const doc of cursor)
				{
				   titulos.push( doc?.titulo );
				}
				if ( typeof titulos[0] == 'undefined' )
					return [ "nenhum_titulo" ];
				else
					return titulos;

			}
			catch( erro )
			{
				console.log(erro);
			}
		}
		else
		{
			try
			{
				let retorno: Array<Object> = await this.colecao.findOne( { titulo: this.titulo } );
				return retorno;
			}
			catch( erro )
			{
				console.log(erro);
			}
		}
		return ["no_operation"];
	}

	/** Fecha o cursor do mongodb corretamente.
	 * @method
	 * @public
	 * @returns {Promise<void>}
	 * */
	public async fechar(): Promise<void>
	{
		try
		{
			await this.client.close();
		}
		catch ( erro )
		{
			console.log( erro, "ERRO: Notas.fechar()" );
		}
	}
}

export { Nota, nota };
