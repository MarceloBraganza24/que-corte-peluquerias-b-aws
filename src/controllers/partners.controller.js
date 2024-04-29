import * as partnersService from '../services/partners.service.js';
import { PartnerAlreadyExists } from "../utils/custom.exceptions.js";

const getAll = async (req, res) => {
    try {
        const partners = await partnersService.getAll();
        res.sendSuccess(partners);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { pid } = req.params;            
        const partner = await partnersService.getById(pid);
        res.sendSuccess(partner);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { first_name ,last_name, dni, phone, email } = req.body;
        if(!first_name || !last_name || !email || !dni || !phone) return res.sendClientError('incomplete values');
        const registeredPartner = await partnersService.register({ ...req.body });
        res.sendSuccessNewResourse(registeredPartner);
    } catch (error) {
        if(error instanceof PartnerAlreadyExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    register
}