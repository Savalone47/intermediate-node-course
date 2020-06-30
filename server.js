const express= require('express');
const mongoose= require('mongoose');

const bodyParser= require('body-parser');
const cors = require('cors');

const PORT= process.env.PORT || 8000;
const app= express();

const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/userData',
	{ useUnifiedTopology: true,
	  useNewUrlParser: true 
	}, (err, data)=>{
		if(err) throw err;
		console.log('database is connected ');
	});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CREATE
app.post('/users', (req, res) => {
   User.create(
   	{
   		name: req.body.name,
   		email: req.body.email,
   		password: req.body.password

   	},
   	(err, data) => {
   		if(err){
   			res.json({success: false, message: err });
   		}else if(!data){
   			res.res.json({sucess: false, message: "Not found"});
   		}else{
   			res.json({sucess: true, data: data});
   			console.log('request success');
   		}
   	})
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  // User.findById()
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})

app.listen(PORT, () => console.log(`server is listening on port:${PORT}`));