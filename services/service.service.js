import ServiceModel from '../models/service.model.js';

class ServiceService {
    async createService(data) {
        const service = await ServiceModel.create(data);
        return service;
    }

    async getServices(){
        const services = await ServiceModel.find();
        return services;
    }


    async getServiceById(id) {
        const service = await ServiceModel.findById(id);
        return service;
    }

    async findOne(query) {
        const service = await ServiceModel.findOne(query);
        return service;
    }

   

   async updateService(data, serviceId){
    const service = await ServiceModel.findByIdAndUpdate(data, serviceId, { new: true });
    return service;
   }

   async deleteService(id){
    const service = await ServiceModel.findByIdAndDelete(id);
    return service;
   }

}

export default new ServiceService();
