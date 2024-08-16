import JobModel from '../models/job.model.js';
import { USER_ROLES } from '../utils/user.js';
class JobService {

    async createJob(data) {

        const job = await JobModel.create(data)
        return job;
    }

    
      async getJobById(jobId) {
        const job = await JobModel.findById(jobId).populate(['artisan']); //removed , 'service' from the bracket
        return job;
      }

      async getJobsByUserId(userId, role) { // Updated function signature
        const query = {};
      
        // Dynamically build the query based on the role
        if (role === USER_ROLES.CLIENT) {
          query.client = userId; // Client role - use client field
        } else if (role === USER_ROLES.ARTISAN) {
          query.artisan = userId; // Artisan role - use artisan field
        } else {
          return null; // Handle invalid role 
        }
      
        const jobs = await JobModel.find(query).populate(['client']); 
        return jobs;
      }
      

      async getAllJobs(query) {
        const allJobs = await JobModel.find(query);
        return allJobs;
      }


      async updateJob(jobId, data) {
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobData, { new: true });
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
