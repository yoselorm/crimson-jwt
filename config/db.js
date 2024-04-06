const mongoose = require("mongoose")

const db = () => {
	mongoose
		.connect(process.env.MONGO_DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((response) => {
			console.log("MongoDB Connection Succeeded.")
		})
		.catch((error) => {
			console.log("Error in DB connection: " + error)
		})
}

module.exports = db
