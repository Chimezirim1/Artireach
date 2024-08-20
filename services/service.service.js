import ServiceModel from '../models/service.model.js';
import UserModel from '../models/user.model.js';

class ServiceService {

    async createService(data) {
        const service = await ServiceModel.create(data);
        return service;
    }

    async getServices(query){
        const services = await ServiceModel.find(query);
        return services;
    }

    async search(query){
        let searchQuery = {};
        if (query?.search) {
            const regexp = RegExp(query?.search, 'i')            
            searchQuery = {
                $or: [
                    { name: regexp },
                    { description: regexp }
                ]
            }
        };

        // if (query?.isActive) {
        //     searchQuery.isActive = true;
        // }


        const services = await ServiceModel.find(searchQuery);
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

   async searchServices(searchTerm) {
    // Use regex to enable partial search
    const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
    const services = await ServiceModel.find({
        $or: [
            { name: { $regex: regex } }, // Search in the 'name' field
            { description: { $regex: regex } }, // Search in the 'description' field
            // Add other fields to search in as needed
        ],
    });
    return services;
}
}



export default new ServiceService();
