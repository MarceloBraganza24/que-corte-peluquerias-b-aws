import * as usersService from '../services/users.service.js';
import { InvalidCredentials, ExpiredToken } from "../utils/custom.exceptions.js";
import { __mainDirname } from '../utils/utils.js';

const getAll = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.sendSuccess(users);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }   
}

const finalizePurchase = async (req, res) => {
    try {
        const uid = req.user._id;
        const purchase = await usersService.purchase(uid);
        res.sendSuccess({ status: 'success', purchase: purchase });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }   
}

const mailToResetPass = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await usersService.getByEmail(email);
        const accessToken = await usersService.sendMailToResetPass(user);
        res.cookie('userTokenJWT', accessToken, { maxAge: 3600000 }).sendSuccess(accessToken);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }   
}

const newPass = async (req, res) => {
    try {
        const { pass } = req.body;
        const token = req.cookies['userTokenJWT'];
        const userUpdated = usersService.changePass(pass, token);
        return res.sendSuccess({ data: userUpdated });
    } catch (error) {
        if(error instanceof ExpiredToken || error instanceof InvalidCredentials) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const changeRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersService.getById(uid);
        if(user.role === 'user') {
            user.documents.forEach(async (document) => {
                if(document.name === 'Identificación' || document.name === 'Comprobante de domicilio' || document.name === 'Comprobante de estado de cuenta') {
                    user.role = 'premium';
                }
            });
            await usersService.update(uid, user);
            res.sendSuccess({ message: 'El rol del usuario fue modificado exitosamente' });
        } else {
            res.sendClientError({ message: 'Solo se puede cambiar a los usuarios con rol "user"' });
        }
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const uploadFiles = async (req, res) => {
    try {
        const { uid } = req.params;
        const files = req.files;
        const user = await usersService.getById(uid)
        if(files.profiles){
            files.profiles.forEach(async (properties) => {
                user.documents.push({ name: 'Profiles', reference: `${__mainDirname}/src/public/img/products/${properties.filename}` })
            });
            await usersService.update(uid, user);
        }
        if(files.products) {
            files.products.forEach(async (properties) => {
                user.documents.push({ name: 'Products', reference: `${__mainDirname}/src/public/img/products/${properties.filename}` })
            });
            await usersService.update(uid, user);
        }
        if(files.documents) {
            files.documents.forEach(async (properties) => {
                user.documents.push({ name: 'Documents', reference: `${__mainDirname}/src/public/documents/${properties.filename}` })
            });
            await usersService.update(uid, user);
        }
        if(files.identificacion) {
            files.identificacion.forEach(async (properties) => {
                user.documents.push({ name: 'Identificación', reference: `${__mainDirname}/src/public/documents/${properties.filename}` })
            });
            await usersService.update(uid, user);
        }
        if(files.comprobanteDeDomicilio) {
            files.comprobanteDeDomicilio.forEach(async (properties) => {
                user.documents.push({ name: 'Comprobante de domicilio', reference: `${__mainDirname}/src/public/documents/${properties.filename}` })
            });
            await usersService.update(uid, user);
        }
        if(files.comprobanteDeEstadoDeCuenta) {
            files.comprobanteDeEstadoDeCuenta.forEach(async (properties) => {
                user.documents.push({ name: 'Comprobante de estado de cuenta', reference: `${__mainDirname}/src/public/documents/${properties.filename}` })
            });
            await usersService.update(uid, user);
        }
        res.sendSuccess({ message: 'El almacenamiento se hizo de manera correcta'}); 
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
    
}

const update = async (req, res) => {
    try {
        const { uid, role } = req.query;
        if(uid && role) {
            const user = await usersService.getById(uid);
            user.role = role;
            const result = await usersService.update(uid, user);
            res.sendSuccess(result);
        }
        const user = await usersService.getById(req.user._id);
        const productToCart = req.body;
        const productoExistente = user.carts.find(prod => prod.product._id.toHexString() === productToCart.product._id);
        if (productoExistente) {
            productoExistente.quantity++;
            await usersService.update(user._id, user);
        } else {
            user.carts.push({ ...productToCart });
            await usersService.update(user._id, user);
        }
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminate = async (req, res) => {
    try {
        const currentUsers = await usersService.eliminate();
        res.sendSuccess({message: 'Los usuarios han sido eliminados correctamente', data: currentUsers});
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminateOne = async (req, res) => {
    try {
        const { uid } = req.params;
        const userDeleted = await usersService.eliminateOne(uid);
        res.sendSuccess({message: 'El usuario ha sido eliminado correctamente', data: userDeleted});
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const eliminateCartUser = async (req, res) => {
    try {
        const { uid } = req.body;
        const user = await usersService.getById(uid);
        user.carts = [];
        await usersService.update(uid, user);
        res.sendSuccess({message: 'El carrito del usuario ha sido eliminado correctamente'});
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    finalizePurchase,
    mailToResetPass,
    newPass,
    changeRole,
    uploadFiles,
    update,
    eliminate,
    eliminateOne,
    eliminateCartUser
}