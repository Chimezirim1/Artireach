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
  async getAllJobs(query = {}) { // Default query is an empty object, meaning no filtering
    const allJobs = await JobModel.find(query)
    .populate([
      { path: 'artisan', name: 'User'},
      { path: 'client', name: 'User'}
    ])
    // .populate('artisan')
    // .populate('client');
    return allJobs;
}



  async getJobsByUserId({ userId, role, _query}) {
    const query = { ..._query };

    if (role === USER_ROLES.CLIENT) {
      query.client = userId;  // Check if userId is in the client array
    } else if (role === USER_ROLES.ARTISAN) {
      query.artisan = userId;
    } else {
      return null;
    }

    const jobs = await JobModel.find(query).populate(['client', 'artisan']);
    return jobs;
  }


  async updateJob(jobId, data) {
    const updatedJob = await JobModel.findByIdAndUpdate(jobId, data, { new: true });
    console.log('Updated Job:', updatedJob);
    return updatedJob;
  }

  async updateJobStatusToOngoing(jobId) {
    const job = await JobModel.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    job.status = 'ongoing';
    await job.save();
    return job;
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
    job.status = 'incomplete';  // Main status updated
    job.artisanStatus = 'incomplete';  // Artisan status updated
    job.clientStatus = 'incomplete';   // Client status updated
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
  async updateArtisanStatus(jobId, artisanStatus) {
    const job = await JobModel.findById(jobId);
    if (!job) throw new Error('Job not found');

    job.artisanStatus = artisanStatus;
    await this._updateMainStatus(job); // Call a function to update the main status if both agree
    return job;
  }

  async updateClientStatus(jobId, clientStatus) {
    const job = await JobModel.findById(jobId);
    if (!job) throw new Error('Job not found');

    job.clientStatus = clientStatus;
    await this._updateMainStatus(job); // Call a function to update the main status if both agree
    return job;
  }

  async _updateMainStatus(job) {
    // Update the main status only if both artisan and client agree
    if (job.artisanStatus === 'ongoing' && job.clientStatus === 'ongoing') {
      job.status = 'ongoing';
    } else if (job.artisanStatus === 'completed' && job.clientStatus === 'completed') {
      job.status = 'completed';
    }
    await job.save();
  }
  async updateClientStatusToOngoing(jobId) {
    return this.updateClientStatus(jobId, 'ongoing');
  }
  
  async updateClientStatusToCompleted(jobId) {
    return this.updateClientStatus(jobId, 'completed');
  }
  
  async updateArtisanStatusToOngoing(jobId) {
    return this.updateArtisanStatus(jobId, 'ongoing');
  }
  
  async updateArtisanStatusToCompleted(jobId) {
    return this.updateArtisanStatus(jobId, 'completed');
  }

  async getTotalJobs() {
    const totalJobs = await JobModel.countDocuments(); // Count all jobs
    return totalJobs;
  }

  async getJobCountsByStatus() {
    const ongoing = await JobModel.countDocuments({ status: 'ongoing' });
    const pending = await JobModel.countDocuments({ status: 'pending' });
    const completed = await JobModel.countDocuments({ status: 'completed' });
    const incomplete = await JobModel.countDocuments({ status: 'incomplete' });

    return { incomplete, ongoing, pending, completed };
  }
}

export default new JobService();
