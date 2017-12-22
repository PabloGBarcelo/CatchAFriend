const mongoose = require('mongoose');

mongoose.connect(process.env.DBURL).then(() =>{
  console.log(`Connected to DB: ${process.env.DBURL}`);
}).catch(err => console.log(err));
