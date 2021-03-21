const express = require("express");
const routerUser = require("./routers/users");
const routerMenu = require("./routers/menu");
const routeradmin = require("./routers/admin");
const routerMenuOffers = require("./routers/menuOffers");
const routercart = require("./routers/cart");
const routerimg = require("./routers/imguser");
const routerOrder = require("./routers/order");
var bodyParser = require("body-parser");
require("./DB-connection");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((options) => options.AllowAnyOrigin());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Origin: *",
// "Access-Control-Allow-Origin:http",

//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


app.use(cors());

app.use("/cart", routercart);
app.use("/users", routerUser);
app.use("/menu", routerMenu);
app.use("/menuOffers", routerMenuOffers);
app.use("/admin", routeradmin);
app.use("/upload", routerimg);
app.use("/order", routerOrder);



/***************************************************************************/
//2 Create a middleware that logs the request url, method, and current time
// let middl_logs = (req, res, next) => {
//   let current_datetime = new Date();
//   let formatted_date =
//     current_datetime.getFullYear() +
//     "-" +
//     (current_datetime.getMonth() + 1) +
//     "-" +
//     current_datetime.getDate() +
//     " " +
//     current_datetime.getHours() +
//     ":" +
//     current_datetime.getMinutes() +
//     ":" +
//     current_datetime.getSeconds();
//   let method = req.method;
//   let url = req.url;
//   let status = res.statusCode;
//   let log = `[${formatted_date}]  ${method}:${url} ${status}`;
//   console.log(log);
//   next();
// };
// app.use(middl_logs);

/***************************************************************************/
//-	3 - Create a global error handler that logs the error and return {“error”:”internal server error”} with status code 500
// app.use(function (err, req, res, next) {
//   if (!err) {
//     return next();
//   }
//   console.log(err);
//   res.status(500).send(err);
// });

const xyz  =  app.listen(process.env.PORT || 3000, () => {
  console.log("server listening on port :");
});
