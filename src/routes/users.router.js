import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import {  getAll, finalizePurchase, mailToResetPass, newPass, changeRole, uploadFiles, update, eliminate, eliminateOne, eliminateCartUser } from '../controllers/users.controller.js'
import { uploader } from "../utils/utils.js";

export default class UsersRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getAll);
        this.post('/finalize-purchase', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, finalizePurchase);
        this.post('/password-link', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, mailToResetPass);
        this.post('/new-pass', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, newPass);
        this.post('/premium/:uid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, changeRole);
        this.post('/:uid/documents', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, uploader.fields(
            [
                {name: 'profiles', maxCount: 1},
                {name: 'products', maxCount: 1},
                {name: 'documents', maxCount: 3},
                {name: 'identificacion', maxCount: 1},
                {name: 'comprobanteDeDomicilio', maxCount: 1},
                {name: 'comprobanteDeEstadoDeCuenta', maxCount: 1}
            ]), uploadFiles);
        this.put('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, update);
        this.delete('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, eliminate);
        this.delete('/delete-one/:uid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, eliminateOne);
        this.delete('/delete-cart-user', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, eliminateCartUser);
    }
}