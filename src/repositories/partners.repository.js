import { Partners } from '../dao/factory.js';

export default class PartnersRepository {
    constructor() {
        this.dao = new Partners();
    }
    getAll = async() => {
        const partners = await this.dao.getAll();
        return partners;
    }
    getById = async(pid) => {
        const partnerById = await this.dao.getById(pid);
        return partnerById;
    }
    getByEmail = async(email) => {
        const partner = await this.dao.getByEmail(email);
        return partner;
    }
    save = async(partner) => {
        const partnerSaved = await this.dao.save(partner);
        return partnerSaved;
    }
    update = async(id, partnerToUpdate) => {
        const partnerUpdated = await this.dao.update(id, partnerToUpdate);
        return partnerUpdated;
    }
    eliminate = async(id) => {
        const partnerDeleted = await this.dao.eliminate(id);
        return partnerDeleted;
    }
}

