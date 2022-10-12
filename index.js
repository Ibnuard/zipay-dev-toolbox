require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

//===================================
// ========= SQL CONF ===============

const config = {
  user: "DevSql1",
  password: "Medankualanamo2021!",
  server: "34.101.223.159",
  database: "ZipayDev",
  options: {
    trustServerCertificate: true,
  },
};

//===================================

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.get("/getotp/:phone", async (req, res) => {
  try {
    await sql.connect(config, function (err) {
      if (err) console.log(err);

      //create request object
      const request = new sql.Request();

      request.query(
        `select * from UserOtp WHERE PhoneNumber = '${req.params.phone}'`,
        function (err, row) {
          if (err) console.log(err);

          //result
          res.send(row?.recordsets[0]);
        }
      );
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`service is running on:: [${port}]`);
});
