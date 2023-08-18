"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resposta = void 0;
;
class Resposta {
    constructor(cons) {
        this.resp.stat = cons.stat;
        this.resp.info = cons.info;
        this.resp.dados = cons.dados;
    }
    get mandar() {
        return this.resp;
    }
}
exports.Resposta = Resposta;
