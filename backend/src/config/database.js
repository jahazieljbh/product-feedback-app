const { MongoClient, ServerApiVersion } = require("mongodb");

const { DB_URL } = process.env;

const client = new MongoClient(DB_URL,  {
	serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
	}
});

module.exports = {
	/**
	 * Singleton-like Database Object that connects to the mongodb database
	 */
	async getDbo() {
		// Connect the client to the server (optional starting in v4.7)
    await client.connect();
		console.log("You successfully connected to MongoDB!");
		return client.db();
	},
};
