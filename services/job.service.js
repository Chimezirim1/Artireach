import JobModel from '../models/job.model.js';
import { USER_ROLES } from '../utils/user.js';
class JobService {

    async createJob(data) {

        const job = await JobModel.create(data)
        return job;
    }

    
    async getJobById(jobId) {
      const job = await JobModel.findById(jobId).populate(['artisan', 'client']); // Ensure 'client' is populated
      return job;
    }

    async getJobsByUserId(userId, role) {
      const query = {};
  
      if (role === USER_ROLES.CLIENT) {
        query.client = { $in: [userId] };  // Check if userId is in the client array
      } else if (role === USER_ROLES.ARTISAN) {
        query.artisan = userId;
      } else {
        return null;
      }
  
      const jobs = await JobModel.find(query).populate(['client']);
      return jobs;
    }


      async updateJob(jobId, data) {
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, data, { new: true });
console.log('Updated Job:', updatedJob);
        return updatedJob;
      }
    
      async deleteJob(jobId) {
        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        return deletedJob;
      }

      async acceptJob(jobId, artisanId) {
        const job = await JobModel.findById(jobId);
        if (!job) {
          throw new Error('Job not found');
        }
        job.artisan = artisanId;
        job.status = 'accepted';
        await job.save();
        return job;
      }
    
      async completeJob(jobId) {
        const job = await JobModel.findById(jobId);
        if (!job) {
          throw new Error('Job not found');
        }
        job.status = 'completed';
        await job.save();
        return job;
      }
    
      async cancelJob(jobId) {
        const job = await JobModel.findById(jobId);
        if (!job) {
          throw new Error('Job not found');
        }
        job.status = 'cancelled';
        await job.save();
        return job;
      }

      // getjobbyuserid
      
  // find and check if client exists
      
      
      // find and check if artisans
      // const existArtisan = await Artisand.findOneIfNotExistsFail({ _id: data.artisan})

      // find and check if service exists

}

export default new JobService();
