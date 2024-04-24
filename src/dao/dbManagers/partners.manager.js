import { partnersModel } from "../dbManagers/models/partners.model.js";

export default class Partners {
    constructor() {
        console.log('Working with partners DB');        
    }
    getAll = async() => {
        const partners = await partnersModel.find().lean();
        return partners;
    }
    getById = async(id) => {
        const partnerById = await partnersModel.findOne({ _id: id }).lean();
        return partnerById;
    }
    getByEmail = async(email) => {
        const partnerByEmail = await partnersModel.findOne({ email }).lean();
        return partnerByEmail;
    }
    save = async(partner) => {
        const partnerSaved = await partnersModel.create(partner);
        return partnerSaved;
    }
    update = async(id, partnerToUpdated) => {
        const partnerUpdated = await partnersModel.findByIdAndUpdate(id, partnerToUpdated);
        return partnerUpdated;
    }
    eliminate = async(id) => {
        const partnerDeleted = await partnersModel.findByIdAndDelete(id);
        return partnerDeleted;
    }
}