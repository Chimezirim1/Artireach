import {Schema, model} from mongoose

const ClientSchema = new Schema({
  
    user:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    savedArtisans:[{
        type: Schema.Types.ObjectId,
        ref: 'Artisan',
    }]
})

const ClientModel = new model("client", ClientSchema);

export default ClientModel;