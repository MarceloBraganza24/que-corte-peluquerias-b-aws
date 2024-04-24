import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { register } from '../controllers/partners.controller.js';

export default class PartnersRouter extends Router {
    init() {
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
    }
}