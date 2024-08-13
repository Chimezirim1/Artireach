import ServiceService from '../services/service.service.js'; 

class ServiceController{
  async createService(req, res){
    console.log('createService')
    const data = req.body;
    // const userId = req.user._id
    const newService = await ServiceService.createService(data)
    res.status(201).send({
      success: true,
      message: "Service created successfully",
      newService
    })
  }

  async getServices(req, res) {
    const serviceQuery = req.query
    const services = await ServiceService.getServices(serviceQuery);
    console.log(services)
    return res.status(200).send({
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
      service
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

  async searchServices(req, res) {
    try {
        const searchTerm = req.query.searchTerm; // Get search term from query parameter
        if (!searchTerm) {
            return res.status(400).send({ message: 'Search term is required', success: false });
        }

        const services = await ServiceService.searchServices(searchTerm);

        res.status(200).send({
            success: true,
            data: services,
        });
    } catch (error) {
        console.error('Error searching services:', error);
        res.status(500).send({ message: 'Error searching services', success: false });
    }
}

}

export default new ServiceController();