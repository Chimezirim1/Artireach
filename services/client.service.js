import ClientModel from "../models/client.model.js";

class ClientService {
    async createClient(data){
    const client = await ClientModel.create(data);
    return client;
    }

    async getClients() {
        const clients = await ClientModel.find();
        return clients;
      }

      async getClient(id) {
        const client = await ClientModel.findById(id);
        return client;
      }

      async updateClient(clientId, data) {
        const updatedClient = await ClientModel.findByIdAndUpdate(clientId, data, { new: true });
        return updatedClient;
      }

      async deleteClient(id) {
        const deletedClient = await ClientModel.findByIdAndDelete(id);
        return deletedClient
      }

      // async saveWorker(clientId, artisanId) {
      //   const client = await ClientModel.findById(clientId);
      //   if (!client) {
      //     throw new Error('Client not found');
      //   }
      //   client.savedWorkers.push(artisanId);
      //   await client.save();
      //   return client;
      // }
    
}

export default new ClientService();