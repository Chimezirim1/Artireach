import ServiceService from '../services/service.service.js'; 

class ServiceController{
  async createService(req, res){
    const data = req.body;
    const userId = req.user._id
    const newService = await ServiceService.createService(data)
    res.status(201).send({
      success: true,
      message: "Service created successfully",
      newService
    })
  }

  async getServices() {
    const services = await ServiceService.getServices();
    res.status(200).send({
      success: true,
      services,
    });
  }

  async getServiceById(req, res){
    const serviceId = req.params.serviceId;
    const services = await ServiceService.getServiceById(serviceId);
    res.status(201).send({
      success: true,
      services,
    })
  }

  async findOne(req, res){
    const query = req.query
    const service = await ServiceService.findOne(query);
    res.status(201).send({
      success: true,
      
    })
  }

  async updateService(req, res){
    const serviceId = req.params.serviceId;
    const service = ServiceService.getServiceById(serviceId)
    if (!service){
      return res.status(404).send({
        success: false,
        message: "Service not found"
      })
    }
    const updateService = await ServiceService.updateService(serviceId)
  }

  async deleteService(req, res){
    const serviceId = req.params.serviceId;
    const service = ServiceService.getServiceById(serviceId);
    if (!service){
      return res.status(404).send({
        success: false,
        message: "Service not found"
      })
    }
    const deleteService = await ServiceService.deleteService(serviceId);
    return service;
  }

  async search(req, res) {
    try {
        const searchTerm = req.query.q; // Get the search term from query parameters 

        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required.' });
        }

        const services = await ServiceService.searchServices(searchTerm);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}

export default new ServiceController();