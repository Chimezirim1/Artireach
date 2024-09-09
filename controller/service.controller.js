import ServiceService from '../services/service.service.js';

class ServiceController {
  async createService(req, res) {
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

  async getServiceById(req, res) {
    const serviceId = req.params.serviceId;
    const services = await ServiceService.getServiceById(serviceId);
    res.status(201).send({
      success: true,
      services,
    })
  }

  async findOne(req, res) {
    const query = req.query
    const service = await ServiceService.findOne(query);
    res.status(201).send({
      success: true,
      service
    })
  }

  async updateService(req, res) {
    const serviceId = req.params.serviceId;
    const updateData = req.body;  // Get the update data from the request body

    const updatedService = await ServiceService.updateService(updateData, serviceId);
    if (!updatedService) {
        return res.status(404).send({
            success: false,
            message: "Service not found"
        });
    }
    return res.status(200).send({
        success: true,
        updatedService
    });
}


  async deleteService(req, res) {
    const serviceId = req.params.serviceId;
    const service = ServiceService.getServiceById(serviceId);
    if (!service) {
      return res.status(404).send({
        success: false,
        message: "Service not found"
      })
    }
    const deleteService = await ServiceService.deleteService(serviceId);
    return service;
  }

  async search(req, res) {
    console.log('searchServices')
    const services = await ServiceService.search(req.query);

    return res.status(200).send({
      success: true,
      data: services,
    });
  }

  async getArtisanPercentageByService(req, res) {
    try {
      const artisanPercentage = await ServiceService.getArtisanPercentageByService();
      return res.status(200).send({
        success: true,
        message: "Percentage of artisans by service retrieved successfully",
        data: artisanPercentage
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "An error occurred while fetching the data",
        error: error.message
      });
    }
  }


}

export default new ServiceController();