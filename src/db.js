const { Client } = require("pg");
const client = new Client();

await client.connect();

const res = await client.query("");
console.log(res.rows[0]);
await client.end();
