import mongoose from 'mongoose';


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('Successfully connect to the Database' ))
.catch(error => console.log(error)); 

