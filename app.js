const express = require("express");
const openConnection = require("./database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test-oracle", async (req, res) => {
  let connection;

  try {
    connection = await openConnection();

    const sqlQuery = `
      SELECT * FROM (
        SELECT * FROM W_TRAMITE ORDER BY ID_TRAMITE
      ) WHERE ROWNUM <= 10
    `;
    const result = await connection.execute(sqlQuery);

    console.log(result.rows);

    res.json(result.rows);
    
  } catch (err) {
    console.error("Error en la consulta", err);
    res.status(500).send("Error al realizar la consulta");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión", err);
      }
    }
  }
});

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
