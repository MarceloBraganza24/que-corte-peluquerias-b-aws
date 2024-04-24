import * as usersService from '../services/users.service.js';

const usersView = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.render('users', {users});
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const cartsView = async (req, res) => {
    try {
        const carts = await cartsService.getAll();
        res.render('carts', {carts});
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const shoppingCartUserView = async (req, res) => {
    try {
        const currentUser = req.user;
        const user = await usersService.getById(currentUser._id);
        const shoppingCartUser = user.carts;
        const balances = shoppingCartUser.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const condition = (shoppingCartUser.length === 0);
        res.render('shoppingCartUser', {
            productsCart: shoppingCartUser,
            user: req.user,
            condition: condition,
            balance: balances
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const finalizePurchaseView = async (req, res) => {
    try {
        const currentUser = req.user;
        const user = await usersService.getById(currentUser._id);
        const shoppingCartUser = user.carts;
        const balances = shoppingCartUser.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const condition = (shoppingCartUser.length === 0);
        res.render('finalizePurchase', {
            productsCart: shoppingCartUser,
            user: req.user,
            condition: condition,
            balance: balances
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const productsView = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsService.getAll(page);
        res.render('products', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            user: req.user
        });
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const userRegisterView = async (req, res) => {
    try {
        res.render('userRegister');
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const loginView = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const resetPassView = async (req, res) => {
    try {
        res.render('resetPass');
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const newPassView = async (req, res) => {
    try {
        res.render('newPass');
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    usersView,
    cartsView,
    shoppingCartUserView,
    finalizePurchaseView,
    productsView,
    userRegisterView,
    loginView,
    resetPassView,
    newPassView
}