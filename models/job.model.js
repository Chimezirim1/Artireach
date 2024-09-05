import {Schema, model} from "mongoose"

const jobSchema = new Schema({
   client: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    ],
    artisan: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
   taskName: {
      type: String,
      required: true,
   },
   date: {
    type: Date,
    required: true,
   },
   taskDescription: {
    type: String,
    required: true,
   },
   location: {
      type: String,
      required: true,
   },
   status: {
    type: String,
    enum: ['pending', 'incomplete', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
   },
   clientStatus: {
    type: String,
    enum: ['pending', 'incomplete', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
   },
   artisanStatus: {
    type: String,
    enum: ['pending', 'incomplete', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
   },
   
})

const JobModel = new model("Job", jobSchema);

export default JobModel;
