"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_conf_1 = require("./configs/server-conf");
server_conf_1.app.listen(server_conf_1.PORTA, () => { console.log(`Ouvindo a porta: ${server_conf_1.PORTA}`); });
