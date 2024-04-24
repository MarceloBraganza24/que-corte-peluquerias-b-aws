import Router from "./router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { usersView, cartsView, shoppingCartUserView, finalizePurchaseView, productsView, userRegisterView, loginView, resetPassView, newPassView } from '../controllers/views.controller.js';

export default class ViewsRouter extends Router {
    init() {
        this.get('/users-view', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, usersView);
        this.get('/carts-view', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, cartsView);
        this.get('/shopping-cart-user-view', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, shoppingCartUserView);
        this.get('/finalize-purchase-view', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, finalizePurchaseView);
        this.get('/products-view', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, productsView);
        this.get('/user-register-view', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, userRegisterView);
        this.get('/login-view', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, loginView);
        this.get('/resetPass-view', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, resetPassView);
        this.get('/newPass-view', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM, accessRolesEnum.USER], passportStrategiesEnum.JWT, newPassView);
    }
}