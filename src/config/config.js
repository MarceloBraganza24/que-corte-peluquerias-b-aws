import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--mode <mode>', 'variable de ambiente')
        .option('--coverage')
        .option('--experimental-vm-modules')
        .option('--detectOpenHandles');
program.parse();

const environment = program.opts().mode;

dotenv.config({
    path: (environment === 'DEVELOPMENT') ? './.env.development' : './.env.production' 
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE,
    userNodemailer: process.env.USER_NODEMAILER,
    passwordNodemailer: process.env.PASSWORD_NODEMAILER,
    privateKeyJWT: process.env.PRIVATE_KEY_JWT
}