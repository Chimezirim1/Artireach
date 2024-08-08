import JobModel from '../models/job.model.js';

class JobService {

    async createJob(data) {

        const job = await JobModel.create(data);
        return job;
    }

    async getJobs(clientId) {
        const jobs = await JobModel.find({ 
            client: clientId 
        }).populate(['artisan', 'service']);
        return jobs;
      }

      async findByArtisanId(artisanId) {
        const jobs = await JobModel.find({ artisan: artisanId }).populate('user');
        return jobs;
    }
      async getJobById(jobId) {
        const job = await JobModel.findById(jobId).populate(['artisan', 'service']);
        return job;
      }

      async updateJob(jobId, data) {
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, data, { new: true }).populate(['artisan', 'service']);
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

  // find and check if client exists
      
      
      // find and check if artisans
      // const existArtisan = await Artisand.findOneIfNotExistsFail({ _id: data.artisan})

      // find and check if service exists

}

export default new JobService();
