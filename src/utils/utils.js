import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import config from '../config/config.js';

import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __mainDirname = path.join(__dirname, '..', '..');

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKeyJWT, { expiresIn: '1h' });
    return token;
}

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        if(files.fieldname === 'profiles') {
            cb(null, `${__mainDirname}/src/public/img/profiles`)
        } else if(files.fieldname === 'products') {
            cb(null, `${__mainDirname}/src/public/img/products`)
        } else if(files.fieldname === 'documents') {
            cb(null, `${__mainDirname}/src/public/documents`)
        } else if(files.fieldname === 'identificacion') {
            cb(null, `${__mainDirname}/src/public/documents`)
        } else if(files.fieldname === 'comprobanteDeDomicilio') {
            cb(null, `${__mainDirname}/src/public/documents`)
        } else if(files.fieldname === 'comprobanteDeEstadoDeCuenta') {
            cb(null, `${__mainDirname}/src/public/documents`)
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploader = multer({
    storage, onError: (err, next) =>{
        console.log(err.message);
        next();
    }
})

export {
    __mainDirname,
    createHash,
    isValidPassword,
    generateToken,
    uploader
}
