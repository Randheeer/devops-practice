const http = require('http');
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL ||  "mongodb://mongo:27017";

async function connectWithRetry() {
  const client = new MongoClient(url);

  while (true) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      return client;
    } catch (err) {
      console.log("MongoDB not ready, retrying...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

async function startServer() {
  const client = await connectWithRetry();

  const server = http.createServer((req, res) => {
    res.end("App + MongoDB connected 🚀");
  });

  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();
