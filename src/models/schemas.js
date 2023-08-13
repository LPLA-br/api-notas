/******************
 * ODM abolido
 ******************/

const { MongoClient } = require("mongodb");

/** Classe para insância de notas.
 * @class
 */
class Nota
{

	/** Representa uma nota em momento de instânciação.
	 *  @constructor
	 *  @param {string} uri - uri de acesso ao database mongo.
	 *  @param {string} database - database criado por ti no mongo.
	 *  @param {string} colecao - nome da colecao dentro do database.
	 *  @param {string} titulo - titulo da nota.
	 *  @param {string} corpo - corpo da nota.
	 */
	constructor( uri ,database, colecao, titulo, corpo )
	{
		this.client = new MongoClient( uri );

		this.database = this.client.db( database );
		this.colecao = this.database.collection( colecao );

		this.titulo = titulo;
		this.corpo = corpo;
	}

	/** Salvar conteúdo construido no database.
	 *
	 *  @async
	 *  @method
	 */
	async salvar()
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
	 *
	 *  @async
	 *  @method
	 */
	async deletar()
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
	 *
	 *  @async
	 *  @method
	 *  @param {string} tituloriginal - titulo para busca no mongo.
	 * */
	async editar( tituloriginal = '' )
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
	 *
	 *  @async
	 *  @method
	 *  @return {Array<Object>} dados da consulta.
	 */
	async procurar()
	{
		if ( this.titulo == '' )
		{
			try
			{
				const cursor = this.colecao.find();
				let titulos = [];
				for await (const doc of cursor)
				{
				   titulos.push( doc?.titulo );
				}
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
				return await this.colecao.findOne( { titulo: this.titulo } );
			}
			catch( erro )
			{
				console.log(erro);
			}
		}
	}

	/**
	 * Fecha o cursor do mongodb corretamente.
	 * @method
	 * */
	async fechar()
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

module.exports = { Nota };
