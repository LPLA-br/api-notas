"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchEditar = exports.putEditar = exports.delRemover = exports.getVisualizar = exports.postCriar = void 0;
const mongo_1 = require("../configs/mongo");
const schemas_1 = require("../models/schemas");
const respostas_1 = require("../models/respostas");
const postCriar = (req, res) => {
    const { titulo, corpo } = req.body;
    if (typeof titulo != 'string' || typeof corpo != 'string') {
        let resposta = new respostas_1.Resposta({ stat: "400", info: "Má requisição de criação" });
        res.status(400).json(resposta.mandar);
    }
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inst = new schemas_1.Nota({ uri: mongo_1.uri, database: "anotacoes", colecao: "notas", titulo: titulo, corpo: corpo });
            yield inst.salvar();
            yield inst.fechar();
            let resposta = new respostas_1.Resposta({ stat: '201', info: 'Novo recurso criado' });
            res.status(200).json(resposta.mandar);
        }
        catch (erro) {
            console.log(erro);
            let resposta = new respostas_1.Resposta({ stat: '500', info: 'Erro interno do servidor impediu a criação do recurso' });
            res.status(500).json(resposta.mandar);
        }
    }))();
};
exports.postCriar = postCriar;
const getVisualizar = (req, res) => {
    const { titulo } = req.query;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let dados;
            let inst;
            if (typeof titulo == 'string') {
                inst = new schemas_1.Nota({ uri: mongo_1.uri, database: "anotacoes", colecao: "notas", titulo: titulo });
                dados = yield inst.procurar();
                yield inst.fechar();
                let resposta = new respostas_1.Resposta({ stat: '200', dados: dados });
                res.status(200).json(resposta.mandar);
            }
            else {
                inst = new schemas_1.Nota({ uri: mongo_1.uri, database: "anotacoes", colecao: "notas", titulo: '' });
                dados = yield inst.procurar();
                yield inst.fechar();
                let resposta = new respostas_1.Resposta({ stat: '200', dados: dados });
                res.status(200).json(resposta.mandar);
            }
        }
        catch (erro) {
            console.log(erro);
            let resposta = new respostas_1.Resposta({ stat: '500', info: 'Erro interno do servidor impediu a obtenção do recurso' });
            res.status(500).json(resposta.mandar);
        }
    }))();
};
exports.getVisualizar = getVisualizar;
const delRemover = (req, res) => {
    const { titulo } = req.body;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (typeof titulo == 'undefined') {
                let resposta = new respostas_1.Resposta({ stat: '400', info: 'Má requisição de deleção' });
                res.status(400).json(resposta.mandar);
            }
            else {
                const inst = new schemas_1.Nota({ uri: mongo_1.uri, database: "anotacoes", colecao: "notas", titulo: titulo });
                yield inst.deletar();
                yield inst.fechar();
                let resposta = new respostas_1.Resposta({ stat: '200', info: 'Recurso deletado' });
                res.status(200).json(resposta.mandar);
            }
        }
        catch (erro) {
            console.log(erro);
            let resposta = new respostas_1.Resposta({ stat: '500', info: 'Erro interno do servidor impediu a deleção do recurso' });
            res.status(500).json(resposta.mandar);
        }
    }))();
};
exports.delRemover = delRemover;
const putEditar = (req, res) => {
    const { tituloriginal, titulo, corpo } = req.body;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inst = new schemas_1.Nota({ uri: mongo_1.uri, database: "anotacoes", colecao: "notas", titulo: titulo });
            yield inst.editar(tituloriginal);
            yield inst.fechar();
            let resposta = new respostas_1.Resposta({ stat: '200', info: 'Recurso modificado' });
            res.status(200).json(resposta.mandar);
        }
        catch (erro) {
            console.log(erro);
            let resposta = new respostas_1.Resposta({ stat: '500', info: 'Erro interno do servidor impediu a edição do recurso' });
            res.status(500).json(resposta.mandar);
        }
    }))();
};
exports.putEditar = putEditar;
const patchEditar = (req, res) => {
    let resposta = new respostas_1.Resposta({ stat: '501', info: "Edição parcial não implementada" });
    res.status(501).json(resposta.mandar);
};
exports.patchEditar = patchEditar;
