import ArtisanModel from '../models/artisan.model.js';

class ArtisanService {

    async create(data) {
        const artisan = await ArtisanModel.create(data);
        return artisan;
    }

    async findAll() {
        const artisans = await ArtisanModel.find();
        return artisans;
    }

    async findById(id) {
        const artisan = await ArtisanModel.findById(id);
        return artisan;
    }

    async findOne(filter) {
        const artisan = await ArtisanModel.findOne(filter);
        return artisan;
    }

    
    async findOneIfNotExistsFail(filter) {
        const artisan = await ArtisanModel.findOne(filter);
        if (!artisan) {
            throw new Error(`No artisan found`);
        }
        
        return artisan;
    }

    async update(id, data) {
        const artisan = await ArtisanModel.findByIdAndUpdate(id, data, { new: true });
        return artisan;
    }

    async delete(id) {
        const artisan = await ArtisanModel.findByIdAndDelete(id);
        return artisan;
    }

    async findByServiceAndLocation(service, location, radius) {
        const query = {
            service: service
        };

        if (location) {
            // Assuming location is a GeoJSON point
            query.location = { 
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [location.longitude, location.latitude], 
                    },
                    $maxDistance: radius * 1000 // Radius in meters
                }
            };
        }

        const artisans = await ArtisanModel.find(query);
        return artisans;
    }
}

export default new ArtisanService();
