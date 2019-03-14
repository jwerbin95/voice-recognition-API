const express = require('express')
const mongoose = require('mongoose')
const Command = require('./models/Command')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/audio-visualiser', {useNewUrlParser: true})

app.use(cors({
	origin: "http://localhost:3001",
	optionSuccessStatus: 200
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/command/:name', (request, response)=>{
	Command.find({
		name: request.params.name
	}).then(data=>{
		response.send(data)
	}).catch(error=>{
		console.log(error.stack)
	})
})

app.get('/commands', (request, response)=>{
	Command.find({}).then(data=>{
		response.send(data)
	}).catch(error=>{
		console.log(error.stack)
	})
})

app.post('/command', (request, response)=>{
	console.log(request.body)
	Command.insertMany({
		name: request.body.name,
		value: request.body.value
	}).then(data=>{
		console.log("Recieved post request: "+data)
	}).catch(error=>{
		console.log(error.stack)
	})
})

app.delete('/remove', (request, response)=>{
	Command.deleteOne({
		name: request.body.name
	}).then(data=>{
		console.log("Sucessfully removed "+request.body.name+" from database")
	}).catch(error=>{
		console.log(error.stack)
	})
})

app.listen(PORT, ()=>{
	console.log("Server now running on port: "+PORT)
})