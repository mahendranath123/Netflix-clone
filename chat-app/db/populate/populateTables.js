const { Client } = require("pg");

require("dotenv").config();

//Table query currentTableSQL() function of array tablesSQLArray must return object like '{ createTableSQL, insertSQL }' but insertSQL is optional
async function populateTables(tablesSQLArray) {
  console.log("seeding...");

  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  try {
    await client.connect();

    for (let i = 0; i < tablesSQLArray.length; i++) {
      const currentTableSQL = tablesSQLArray[i];
      const { createTableSQL, insertSQL } = await currentTableSQL();

      console.log(
        `Executing table creation query of array position ${i} starting from 0...`
      );

      await client.query(createTableSQL);

      // Execute data insertion query if applicable
      if (insertSQL) {
        console.log(`Insert data of array position ${i} starting from 0...`);
        await client.query(insertSQL);
      } else {
        console.log(`No query to insert at position ${i}starting from 0...`);
      }
      console.log(`Done seeding!, at position ${i}starting from 0...`);
    }
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    await client.end();
    console.log("done");
  }
}

module.exports = populateTables;
