"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORTA = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const tudo_1 = require("../routes/tudo");
const utilitarios_1 = require("../middlewares/utilitarios");
const app = (0, express_1.default)();
exports.app = app;
const PORTA = 8080;
exports.PORTA = PORTA;
app.set('name', 'Api-notas');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', tudo_1.router);
app.use(utilitarios_1.uriLog);
