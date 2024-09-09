import ServiceModel from '../models/service.model.js';
import UserModel from '../models/user.model.js';
import { USER_ROLES } from '../utils/user.js';

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

   

    async updateService(data, serviceId) {
        const service = await ServiceModel.findByIdAndUpdate(serviceId, data, { new: true });
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


async getArtisanPercentageByService() {
    // Get all services from the database
    const services = await ServiceModel.find();

    // Aggregate artisans by service
    const artisansByService = await UserModel.aggregate([
      { $match: { role: USER_ROLES.ARTISAN } },
      { $group: { _id: "$serviceType", count: { $sum: 1 } } },
    ]);

    // Create a map to hold the artisan count for each service
    const artisanCountMap = artisansByService.reduce((acc, artisanService) => {
        acc[artisanService._id] = artisanService.count;
        return acc;
    }, {});

    // Calculate total artisans
    const totalArtisans = await UserModel.countDocuments({ role: USER_ROLES.ARTISAN });

    // Build the result array
    const artisanPercentage = services.map(service => {
        const serviceArtisanCount = artisanCountMap[service._id] || 0; // Default to 0 if no artisans
        const percentage = totalArtisans > 0 ? (serviceArtisanCount / totalArtisans) * 100 : 0;
        return {
            serviceName: service.name,
            percentage: percentage.toFixed(2)
        };
    });

    return artisanPercentage;
}
}






export default new ServiceService();
