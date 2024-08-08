import ServiceModel from '../models/service.model.js';

class ServiceService {
    async createService(data) {
        const service = await ServiceModel.create(data);
        return service;
    }

    async getServices(query){
        const services = await ServiceModel.find(query);
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

//    async searchServices(searchTerm) {
//     try {
//         const services = await ServiceModel.find({
//             $text: { $search: searchTerm } // Use $text operator
//         });
//         return services;
//     } catch (error) {
//         throw error; 
//     }
// }
}



export default new ServiceService();
