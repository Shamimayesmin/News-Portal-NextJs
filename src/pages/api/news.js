const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ui8slz3.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});



async function run(req, res) {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		const newsCollection = client.db("news-portal").collection("news");

        if(req.method === "GET"){
            const news = await newsCollection.find({}).toArray()
            res.send({message: 'success', status:200, data: news})
        }

        if(req.method === "POST"){
            const news = req.body;
            const result = await newsCollection.insertOne(news)
            res.json(result);

            console.log(result);
        }
	} finally {
		
	}
}

export default run;
