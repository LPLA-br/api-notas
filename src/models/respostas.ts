/*****************************
 * Api para emissão
 * de respostas padronizadas
 * ao cliente
 ****************************/

/** Interface da descrição
*   @interface
*   @property { string | undefined } stat - status da requisição
*   @property { string | undefined } info - informações de erro
*   @property { Object[] | string[] | undefined } dados - informações variáveis de requisição bem sucedida
* */
interface resposta
{
	stat?: string | undefined;
	info?: string | undefined;
	dados?: Object[] | string[] | undefined;
};

/** Classe para instância de uma resposta padronizada
*   @class
* */
class Resposta
{

	public resp: resposta;

	/** Construtor de notas.
	    @constructor
	    @param {resposta} cons - dados para construção de uma resposta.
	*/
	constructor( cons: resposta )
	{
		this.resp.stat = cons.stat;
		this.resp.info = cons.info;
		this.resp.dados = cons.dados;
	}

	/** Mandar resposta GETTER.
	*   @method
	*   @public
	*   @returns {resposta} dados da resposta
	* */
	public get mandar(): resposta
	{
		return this.resp;
	}

}

export { Resposta };
