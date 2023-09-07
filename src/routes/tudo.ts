/***************************8
 * ROTAS DAS API
 ****************************/
import express from 'express';
import mongodb from 'mongodb';

import { postCriar, getVisualizar, delRemover, putEditar } from '../controllers/ctrl';
import { mostrarUrl } from '../middlewares/utilitarios';

const router = express.Router();

/*  HTTP - UNIFIELD RESOURCE LOCATOR
 * - parâmetros de rota /exemplo/:dado/:tipo
 * - consultas pela rota ?chave=valor&chave=valor */

router.get( '/', ( req: Express.Request, res: Express.Response )=>
{
	res.type('html').status(200).send('<h1>APINOTAS</h1>')
});

router.get( '/visualizar', mostrarUrl, getVisualizar );
router.post( '/criar', postCriar );
router.delete( '/deletar', delRemover );
router.put( '/editar', putEditar );

export { router };
