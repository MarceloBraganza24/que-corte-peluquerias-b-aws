import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { singUp, login, logout, current } from '../controllers/sessions.controller.js';

export default class SessionsRouter extends Router {
    init() {
        this.post('/singUp', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, singUp);
        this.post('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, login);
        this.post('/logout', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, logout);
        this.get('/current', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, current);
    }
}