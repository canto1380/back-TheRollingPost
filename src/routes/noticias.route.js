import {Router} from 'express'
import noticiasControlador from '../controllers/noticias.controller'
import {validJWT} from '../controllers/auth'

const router = Router();

/* Ruta agregar noticia */
router.post('/addNoticia', validJWT ,noticiasControlador.nuevaNoticia)

/* Ruta listar noticias */
router.get('/listNoticias',noticiasControlador.listarNoticias)

/* Ruta listar noticias publicadas*/
router.get('/listNoticiasPublicadas',noticiasControlador.listarNoticiasPublicadas)

/* Ruta buscar noticia */
router.get('/:id',noticiasControlador.buscarNoticia)

// router.param('byId', noticiasControlador.byId)
router.get('/foto/:byId', validJWT, noticiasControlador.buscarPhoto)

/* Ruta eliminar noticia */
router.delete('/:id', validJWT, noticiasControlador.eliminarNoticia)

/* Ruta actualizar noticias */
router.put('/:id', validJWT, noticiasControlador.actualizarNoticia)

export default router;
