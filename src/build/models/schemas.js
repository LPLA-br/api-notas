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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nota = void 0;
const mongodb_1 = require("mongodb");
;
class Nota {
    constructor(credenciais) {
        this.uri = credenciais.uri;
        this.client = new mongodb_1.MongoClient(credenciais.uri);
        this.database = this.client.db(credenciais.database);
        this.colecao = this.database.collection(credenciais.colecao);
        this.titulo = credenciais.titulo;
        this.corpo = credenciais.corpo;
    }
    salvar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.colecao.insertOne({ titulo: this.titulo, corpo: this.corpo });
            }
            catch (erro) {
                console.log(erro, "ERRO: Notas.salvar()");
            }
        });
    }
    deletar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.colecao.deleteOne({ titulo: this.titulo });
            }
            catch (erro) {
                console.log(erro, "ERRO: Notas.deletar()");
            }
        });
    }
    editar(tituloriginal = '') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.colecao.updateOne({ titulo: tituloriginal }, { $set: { 'titulo': this.titulo, 'corpo': this.corpo } });
            }
            catch (erro) {
                console.log(erro, "ERRO: Notas.editar");
            }
        });
    }
    procurar() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.titulo == '') {
                try {
                    const cursor = this.colecao.find();
                    let titulos = [];
                    try {
                        for (var _d = true, cursor_1 = __asyncValues(cursor), cursor_1_1; cursor_1_1 = yield cursor_1.next(), _a = cursor_1_1.done, !_a; _d = true) {
                            _c = cursor_1_1.value;
                            _d = false;
                            const doc = _c;
                            titulos.push(doc === null || doc === void 0 ? void 0 : doc.titulo);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = cursor_1.return)) yield _b.call(cursor_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (typeof titulos[0] == 'undefined') {
                        return ["nenhum_titulo"];
                    }
                    else {
                        return titulos;
                    }
                }
                catch (erro) {
                    console.log(erro);
                }
            }
            else {
                try {
                    let retorno = yield this.colecao.findOne({ titulo: this.titulo });
                    return retorno;
                }
                catch (erro) {
                    console.log(erro);
                }
            }
            return ["no_operation"];
        });
    }
    fechar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.close();
            }
            catch (erro) {
                console.log(erro, "ERRO: Notas.fechar()");
            }
        });
    }
}
exports.Nota = Nota;
