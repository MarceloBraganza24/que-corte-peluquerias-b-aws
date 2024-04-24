import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { createOrderShift, createOrderPartner, getWebhooksShifts, getWebhooksPartners } from '../controllers/payments.controller.js';

export default class PaymentsRouter extends Router {
    init() {
        this.post('/create-preference-shift', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrderShift);
        this.post('/create-preference-partner', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, createOrderPartner);
        this.post('/webhook-shift', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooksShifts);
        this.post('/webhook-partner', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getWebhooksPartners);
    }
}