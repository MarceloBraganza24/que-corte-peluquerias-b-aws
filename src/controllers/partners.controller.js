import * as partnersService from '../services/partners.service.js';
import { PartnerAlreadyExists } from "../utils/custom.exceptions.js";

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
    register
}