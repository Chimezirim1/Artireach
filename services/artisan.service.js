// import ArtisanModel from '../models/artisan.model.js';

// class ArtisanService {

//     async create(data) {
//         const artisan = await ArtisanModel.create(data);
//         return artisan;
//     }

//     async findAll() {
//         const artisans = await ArtisanModel.find();
//         return artisans;
//     }

//     async findById(id) {
//         const artisan = await ArtisanModel.findById(id);
//         if (!artisan) {
//             throw new Error('Artisan not found');
//         }
//         return artisan;
//     }

//     async update(id, data) {
//         const artisan = await ArtisanModel.findByIdAndUpdate(id, data, { new: true });
//         if (!artisan) {
//             throw new Error('Artisan not found');
//         }
//         return artisan;
//     }

//     async delete(id) {
//         const artisan = await ArtisanModel.findByIdAndDelete(id);
//         if (!artisan) {
//             throw new Error('Artisan not found');
//         }
//         return artisan;
//     }

//     async findByProfessionAndLocation(profession, location, radius) {
//         const query = {
//             profession: profession
//         };

//         if (location) {
//             // Assuming location is a GeoJSON point
//             query.location = { 
//                 $near: {
//                     $geometry: {
//                         type: 'Point',
//                         coordinates: [location.longitude, location.latitude], 
//                     },
//                     $maxDistance: radius * 1000 // Radius in meters
//                 }
//             };
//         }

//         const artisans = await ArtisanModel.find(query);
//         return artisans;
//     }
// }

// export default new ArtisanService();
