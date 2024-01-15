const mongoose = require("mongoose");

const connection = async () => {
	try {
        const conn = await mongoose.connect(process.env.DB_URI)
		console.log("INFO: Connection with DB is correct, you connected to ->", conn.connection.name);
	} catch (error) {
        console.error("ERROR: Failed connection with DB", error.message);
    }
};

module.exports = connection ;
