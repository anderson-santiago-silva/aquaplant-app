import mongoose from 'mongoose';


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('Successfully connect to the Database' ))
.catch(error => console.log(error)); 

