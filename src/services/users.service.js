import UsersRepository from '../repositories/users.repository.js';
import * as ticketsService from '../services/tickets.service.js';
import { Users } from '../dao/factory.js';
import { InvalidCredentials, UserAlreadyExists, ExpiredToken } from '../utils/custom.exceptions.js';
import { createHash, generateToken, isValidPassword } from '../utils/utils.js';
import { htmlLoginInvalidCredentials, htmlNewRegister, htmlLastConnection } from '../utils/custom.html.js';
import { sendEmail } from './mail.service.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import mongoose from 'mongoose';

const usersDao = new Users();
const usersRepository = new UsersRepository(usersDao);

const getAll = async() => {
    const usersDto = await usersRepository.getAll();
    return usersDto;
}

const getById = async(uid) => {
    const userById = await usersRepository.getById(uid);
    return userById;
}

const getByEmail = async(email) => {
    const userByEmail = await usersRepository.getByEmail(email);
    if(!userByEmail) {
        throw new InvalidCredentials('user not found');
    }
    return userByEmail; 
}

const getCurrent = async(user) => {
    const current = await usersRepository.getCurrent(user);
    return current;
}

const sendMailToResetPass = async(user) => {
    const userToken = {
        email: user.email
    }
    const accessToken = generateToken(userToken);
    const emailToResetPass = {
        to: user.email,
        subject: 'Email para recuperar contraseña',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Recuperación de password</h1>
            <h2>Accede al siguiente link</h2>
            <a href="https://58c8-18-191-97-85.ngrok-free.app/newPass-view?token=${accessToken}"> has click aquí</a>
        </body>
        </html>`
    }
    await sendEmail(emailToResetPass);
    return accessToken;
}

const register = async(user) => {
    const userByEmail = await usersRepository.getByEmail(user.email);
    if(userByEmail) {
        throw new UserAlreadyExists('user already exists');
    }
    const hashedPassword = createHash(user.password);
    const newUser = {
        ...user
    }
    newUser.password = hashedPassword;
    const emailNewRegister = {
        to: user.email,
        subject: 'Registro exitoso',
        html: htmlNewRegister
    }
    await sendEmail(emailNewRegister);
    const result = await usersRepository.save(newUser);
    return result;
}

const login = async(password, email) => {
    const user = await usersRepository.getByEmail(email);
    if(!user) {
        throw new InvalidCredentials('incorrect credentials');
    }
    const comparePassword = isValidPassword(password, user.password);
    if(!comparePassword) {
        const emailInvalidCredentials = {
            to: user.email,
            subject: 'Login fallido',
            html: htmlLoginInvalidCredentials
        }
        await sendEmail(emailInvalidCredentials);
        throw new InvalidCredentials('incorrect credentials');
    } 
    user.last_connection = new Date().toLocaleString();
    user.isLoggedIn = true;
    await usersRepository.update(user._id, user);
    const accessToken = generateToken(user);
    return accessToken;
}

const changePass = async(pass, token) => {
    const userTokenVerify = jwt.verify(token, config.privateKeyJWT);
    if(!userTokenVerify) throw new ExpiredToken('No token provide');
    const userByEmail = await usersRepository.getByEmail(userTokenVerify.user.email);
    const hashedPassword = createHash(pass);
    const comparePassword = isValidPassword(pass, userByEmail.password);
    if(comparePassword) throw new InvalidCredentials('La contraseña no debe ser igual a la anterior, por favor colocar una nueva');
    const userToUpdate = {
        ...userByEmail
    }
    userToUpdate.password = hashedPassword;
    await usersRepository.update(userByEmail._id, userToUpdate);
    return userToUpdate;
}

const update = async(id, userToUpdate) => {
    const userUpdated = await usersRepository.update(id, userToUpdate);
    return userUpdated;
}

const updateProperty = async(id, role) => {
    const user = await usersRepository.getById(id);
    user.role = role;
    const userUpdated = await usersRepository.update(id, user);
    return userUpdated;
}

const eliminate = async() => {
    const allUsers = await usersRepository.getAll();
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - 2);
    const users = allUsers.filter((user) => user.last_connection < currentTime.toLocaleString());
    users.forEach(async (user) => {
        await usersRepository.eliminate(user._id);
        const emailLastConnection = {
            to: user.email,
            subject: 'Eliminación del usuario',
            html: htmlLastConnection
        }
        await sendEmail(emailLastConnection);
    })
    const usersResult = await usersRepository.getAll();
    return usersResult;
}

const eliminateOne = async(id) => {
    const userDeleted = await usersRepository.eliminate(id);
    return userDeleted;
}

let amount = 0;
const outStock = [];
const purchase = async(uid) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const user = await usersRepository.getById(uid);
        const cart = user.carts;
        cart.forEach(async ({ product, quantity }) => {
            if(product.stock >= quantity) {
                amount += product.price * quantity;
                product.stock -= quantity;
                await productsRepository.update(product._id, product)
            } else {
                outStock.push({ product, quantity });
            }
            return outStock;
        })
        const purchaser = user.email;
        const ticket = await ticketsService.save(purchaser, amount);
        user.carts = outStock.map(item => ({...item}));
        await usersRepository.update(uid, user);
        await session.commitTransaction();
        return ticket;
    } catch (error) {
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
}

export {
    getAll,
    getById,
    getCurrent,
    getByEmail,
    sendMailToResetPass,
    register,
    login,
    changePass,
    update,
    updateProperty,
    usersRepository,
    eliminate,
    eliminateOne,
    purchase
}