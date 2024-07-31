import artisanService from '../services/artisanService.js';

class ArtisanController {

    async create(req, res) {
        try {
            const newArtisan = await artisanService.create(req.body);
            res.status(201).json(newArtisan);
        } catch (error) {
            res.status(500).json({ message: 'Error creating artisan' });
        }
    }

    async findAll(req, res) {
        try {
            const artisans = await artisanService.findAll();
            res.status(200).json(artisans);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching artisans' });
        }
    }

    async findById(req, res) {
        try {
            const artisan = await artisanService.findById(req.params.artisanId);
            res.status(200).json(artisan);
        } catch (error) {
            if (error.message === 'Artisan not found') {
                res.status(404).json({ message: 'Artisan not found' });
            } else {
                res.status(500).json({ message: 'Error fetching artisan' });
            }
        }
    }

    async update(req, res) {
        try {
            const updatedArtisan = await artisanService.update(req.params.artisanId, req.body);
            res.status(200).json(updatedArtisan);
        } catch (error) {
            if (error.message === 'Artisan not found') {
                res.status(404).json({ message: 'Artisan not found' });
            } else {
                res.status(500).json({ message: 'Error updating artisan' });
            }
        }
    }

    async delete(req, res) {
        try {
            await artisanService.delete(req.params.artisanId);
            res.status(204).send(); // No content
        } catch (error) {
            if (error.message === 'Artisan not found') {
                res.status(404).json({ message: 'Artisan not found' });
            } else {
                res.status(500).json({ message: 'Error deleting artisan' });
            }
        }
    }

    async search(req, res) {
        try {
            const { profession, location, radius } = req.query; 
            const artisans = await artisanService.findByProfessionAndLocation(profession, location, radius);
            res.status(200).json(artisans);
        } catch (error) {
            res.status(500).json({ message: 'Error searching artisans' });
        }
    }
}

export default new ArtisanController();
