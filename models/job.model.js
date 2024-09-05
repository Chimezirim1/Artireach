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
   hireTime:{
    type: Date, 
        default: Date.now 
   }
},
    {
        timestamps: true,  // This will add createdAt and updatedAt fields
        toJSON: {
            transform: (doc, ret) => {
            ret.hireTime = ret.createdAt;  // Rename createdAt to dateOfJoining
            delete ret.createdAt;  // Optionally remove createdAt if you don't want it
            delete ret.updatedAt;
            return ret;
            }
        }
    })

const JobModel = new model("Job", jobSchema);

export default JobModel;
