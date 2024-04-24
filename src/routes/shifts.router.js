import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, save } from '../controllers/shifts.controller.js';

export default class ShiftsRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM], passportStrategiesEnum.JWT, getAll);
        this.get('/:sid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM], passportStrategiesEnum.JWT, getById);
        //this.post('/register', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, save);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, save);
    }
}