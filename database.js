const oracledb = require("oracledb");

async function openConnection() {
  let connection;

  // https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html

  try {
    oracledb.initOracleClient();
    connection = await oracledb.getConnection({
      user: "username",
      password: "password",
      connectString: "127.0.0.1:1521/database",
    });

    console.log("Conexión exitosa a Oracle DB!");
    return connection;
  } catch (err) {
    console.error("Error en la conexión", err);
  }
}

module.exports = openConnection;
