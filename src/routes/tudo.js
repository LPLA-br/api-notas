/***************************8
 * ROTAS DAS API
 ****************************/
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

const
{
	postCriar,
	getVisualizar,
	delRemover,
	putEditar
} = require('../controllers/cr');

const
{
	mostrarUrl
} = require('../middlewares/utilitarios');

/*  HTTP - UNIFIELD RESOURCE LOCATOR
 * - parâmetros de rota /exemplo/:dado/:tipo
 * - consultas pela rota ?chave=valor&chave=valor */

router.get( '/', ( req, res )=> { res.status(200).send('<h1>APINOTAS</h1>') } );

/** visualizar { titulo: String } query */
router.get( '/visualizar', mostrarUrl, getVisualizar );

/** criar { titulo: String, corpo: String } body */
router.post( '/criar', postCriar );

/** deletar { titulo: String } query */
router.delete( '/deletar', delRemover );

/** editar { tituloriginal: String, titulonovo: String, corpo: String } body */
router.put( '/editar', putEditar );

module.exports = router;
