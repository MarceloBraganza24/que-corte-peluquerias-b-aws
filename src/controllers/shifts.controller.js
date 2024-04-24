import * as shiftsService from '../services/shifts.service.js';

const getAll = async (req, res) => {
    try {
        const shifts = await shiftsService.getAll();
        res.sendSuccess(shifts);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const { sid } = req.params;            
        const shift = await shiftsService.getById(sid);
        res.sendSuccess(shift);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

const save = async (req, res) => {
    try {
        const { first_name, last_name, date, schedule } = req.body;
        const d = new Date(date)
        const dateString = d.toISOString().split('T')[0]
        const shift = await shiftsService.save(first_name, last_name, dateString, schedule);
        res.sendSuccessNewResourse(shift);
    } catch (error) {
        res.sendServerError(error.message);
        req.logger.error(error.message);
    }
}

export {
    getAll,
    getById,
    save
}