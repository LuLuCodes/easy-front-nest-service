"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_typescript_generator_1 = require("sequelize-typescript-generator");
const path_1 = require("path");
const dotenv = __importStar(require("dotenv"));
const CodeConversion_1 = require("./CodeConversion");
dotenv.config({ path: (0, path_1.resolve)(__dirname, '../src/.env') });
(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        connection: {
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT + ""),
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        },
        metadata: {
            indices: true,
            case: {
                model: 'PASCAL',
                column: 'LOWER',
            },
        },
        output: {
            clean: true,
            outDir: (0, path_1.resolve)(__dirname, '../src/models'),
        },
        strict: false,
    };
    const dialect = new sequelize_typescript_generator_1.DialectMySQL();
    const builder = new sequelize_typescript_generator_1.ModelBuilder(config, dialect);
    try {
        yield builder.build();
        CodeConversion_1.CodeConversion.run();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}))();
