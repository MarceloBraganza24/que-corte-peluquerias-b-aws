import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, save } from '../controllers/tickets.controller.js';

export default class TicketsRouter extends Router {
    init() {
        this.get('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM], passportStrategiesEnum.JWT, getAll);
        this.get('/:tid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM], passportStrategiesEnum.JWT, getById);
        this.post('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, save);
    }
}