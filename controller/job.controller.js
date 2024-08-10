import JobService from '../services/job.service.js';

class JobController {

    async createJob(req, res) {
        
       try {
        const client = req.user._id
       const jobData = req.body;
       const newJob = await JobService.createJob({...jobData, client});
       res.status(201).send({
        success:true,
        message: "Job request created successfully",
        newJob
       })
       } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false, 
            message: 'Failed to create jobs' 
        });
       }

    }

    async getJobs(req,res){
        try {
            const jobs = await JobService.getJobs();
            res.status(200).send({
              success: true,
              jobs,
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({
                success: false, 
                message: 'Failed to fetch jobs' 
            });
          }
    }
    
    async findByArtisanId(req, res) {
        try {
            const artisanId = req.params.artisanId;
            const jobs = await JobService.findByArtisanId(artisanId);
            res.status(200).send({
                success: true,
                jobs,
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({ 
                success: false, 
                message: 'Failed to fetch jobs' 
            });
        }
    }
    
    async getJobById(req, res) {
        try {
            const jobId = req.params.jobId;
            const job = await JobService.getJobById(jobId);
            res.status(200).send({
                success: true,
                job,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ 
                success: false, 
                message: 'Failed to fetch job' 
            });
        }
    }

    async updateJob(req, res) {
        try {
            const jobId = req.params.jobId;
            const jobData = req.body;
            const updatedJob = await JobService.updateJob(jobId, jobData);
            res.status(200).send({
                success: true,
                message: 'Job updated successfully',
                job: updatedJob
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ 
                success: false, 
                message: 'Failed to update job' 
            });
        }
    }
    
    async deleteJob(req, res) {
        try {
            const jobId = req.params.jobId;
            await JobService.deleteJob(jobId);
            res.status(200).send({
                success: true,
                message: 'Job deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ 
                success: false, 
                message: 'Failed to delete job' 
            });
        }
    }
            
    async acceptJob(req, res) {
        try {
            const jobId = req.params.jobId;
            const artisanId = req.body.artisanId;
            const acceptedJob = await JobService.acceptJob(jobId, artisanId);
            res.status(200).send({
                success: true,
                message: 'Job accepted successfully',
                job: acceptedJob
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ success: false, message: 'Failed to accept job' });
        }
    }   
    
    async completeJob(req, res) {
        try {
            const jobId = req.params.jobId;
            const completedJob = await JobService.completeJob(jobId);
            res.status(200).send({
                success: true,
                message: 'Job completed successfully',
                job: completedJob
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ 
                success: false, 
                message: 'Failed to complete job' 
            });
        }
    }    
    
    async cancelJob(req, res) {
        try {
            const jobId = req.params.jobId;
            const canceledJob = await JobService.cancelJob(jobId);
            res.status(200).send({
                success: true,
                message: 'Job canceled successfully',
                job: canceledJob
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ success: false, message: 'Failed to cancel job' });
        }
    }
//     async updateStatus(req, res) {
//             const updatedJob = await JobService.updateStatus(req.params.JobId, req.body.status);
//             res.status(200).json(updateJob);
//         } catch (error) {
//             if (error.message === 'Job request not found') {
//                 res.status(404).json({ message: 'Job request not found' });
//             } else {
//                 res.status(500).json({ message: 'Error updating Job request status' });
//             }
//         }
    
}

export default new JobController();