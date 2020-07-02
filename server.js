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

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CREATE
app.post('/users', (req, res) => {
	User.create(
		{...req.body},
		(err, data) => { sendResponse(res, err, data)}
	);
})

app.route('/users/:id')
// READ
	.get((req,res)=>{
		User.findById(
			req.params.id, 
			(err, data) => {sendResponse(res, err, data)});
	})

// UPDATE
	.put((req,res)=>{
		User.findByIdAndUpdate(req.params.id, 
			{...req.body},
			{ new : true},
			(err, data) =>{sendResponse(res, err, data)});
	})

// DELETE
	.delete((req,res)=>{
		User.findByIdAndDelete(
			req.params.id, 
			(err, data)=>{sendResponse(res, err, data)});
	})

// Function
function sendResponse(res, err, data){
	if(err){
		res.json({success:false, message:err});
	}else if(!data){
		res.json({success:false, message: "Not found"});
	}else{
		res.json({success:true, data:data});
	}
}

// Server
app.listen(PORT, () => console.log(`server is listening on port:${PORT}`));