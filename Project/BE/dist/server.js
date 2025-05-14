"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
// Initialize the database connection and start the server
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(config_1.default.port, () => {
        console.log(`Server running on port ${config_1.default.port}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if database connection fails
});
