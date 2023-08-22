"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resposta = void 0;
;
class Resposta {
    constructor(cons) {
        this.resp = cons;
    }
    get mandar() {
        return this.resp;
    }
}
exports.Resposta = Resposta;
