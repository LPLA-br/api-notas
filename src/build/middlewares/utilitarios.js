"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarUrl = exports.uriLog = void 0;
const uriLog = (req, res, next) => {
    const t = new Date();
    console.log(`REQUISIÇÃO de ${req.ip} do recurso ${req.path} de método ${req.method} - ${t.toString()}`);
    next();
};
exports.uriLog = uriLog;
const mostrarUrl = (req, res, next) => {
    const regexp = new RegExp("\/[a-z]*\?.*$");
    try {
        console.log(regexp.exec(req.originalUrl)[0]);
    }
    catch (erro) {
        console.log("EXPRESSÃO REGULAR FALHOU:");
        console.log("------------\n", erro, "-------------\n");
    }
    next();
};
exports.mostrarUrl = mostrarUrl;
