"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const ctrl_1 = require("../controllers/ctrl");
const utilitarios_1 = require("../middlewares/utilitarios");
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.type('html').status(200).send('<h1>APINOTAS</h1>');
});
router.get('/visualizar', utilitarios_1.mostrarUrl, ctrl_1.getVisualizar);
router.post('/criar', ctrl_1.postCriar);
router.delete('/deletar', ctrl_1.delRemover);
router.put('/editar', ctrl_1.putEditar);
