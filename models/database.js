const pg = require('pg');

const db_user = process.env.DATABASE_USER || "postgres";
const db_pass = process.env.DATABASE_PASS || "postgres";
const db_host = process.env.DATABASE_HOST || "pauliceia_postgis";
const db_name = process.env.DATABASE_NAME || "pauliceia";

//console.log("-user: "+db_user+" -pass: "+db_pass+" -host: "+db_host+" -name: "+db_name);

const connectionString = {
  host: db_host,
  port: 5432,
  user: db_user,
  database: db_name,
  password: db_pass,
  rejectUnauthorized: false
}

const client = new pg.Client(connectionString);

client.connect();

const query = client.query('select * from tb_street');
console.log('Done!')
query.on('end', () => { connectionString.end(); });

