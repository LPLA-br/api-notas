/*****************************
 * Api para emissão
 * de respostas padronizadas
 * ao cliente
 ****************************/

/** Interface da descrição
*   @interface
*   @property { string } stat - status da requisição
*   @property { string } info - informações de erro
*   @property { Object[] | string[] } dados - informações variáveis de requisição bem sucedida
* */
interface Respost
{
	stat?: string | undefined ;
	info?: string | undefined;
	dados?: Object[] | string[] | undefined;
};

/** Classe para instância de uma resposta padronizada
*   @class
* */
class Resposta
{

	/** Objeto de resposta */
	protected resp: Respost;

	/** Construtor de notas.
	    @constructor
	    @param {Respost} cons - dados para construção de uma Resposta.
	*/
	constructor( cons: Respost )
	{
		this.resp = cons;
	}

	/** Mandar resposta GETTER.
	*   @method
	*   @public
	*   @returns {Respost} dados da resposta
	* */
	public get mandar(): Respost
	{
		return this.resp;
	}

}

export { Resposta };
