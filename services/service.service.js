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
    // Get the total number of artisans
    const totalArtisans = await UserModel.countDocuments({ role: "ARTISAN" });

    // Group artisans by service type and count the number of artisans in each service
    const artisansByService = await UserModel.aggregate([
      { $match: { role: "ARTISAN" } },  // Match only artisans
      { $group: { _id: "$serviceType", count: { $sum: 1 } } },  // Group by serviceType and count artisans
      { $lookup: { 
          from: "services", 
          localField: "_id",  // This should match the field in the Service collection
          foreignField: "_id", // This should be the field in the Service collection
          as: "service" 
      } },  
      { $unwind: "$service" },  // Unwind the service array
      { $project: { 
          serviceName: "$service.name", 
          count: 1 
      } }  // Project the necessary fields
    ]);

    // Calculate the percentage of artisans in each service
    const artisanPercentage = artisansByService.map(service => {
      const percentage = (service.count / totalArtisans) * 100;
      return {
        serviceName: service.serviceName,
        percentage: percentage.toFixed(2)  // Format to 2 decimal places
      };
    });

    return artisanPercentage;
}


}



export default new ServiceService();
