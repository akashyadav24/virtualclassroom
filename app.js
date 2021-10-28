require("dotenv").config();
const express = require('express');
const app = express();
const tutorRouter = require("./classroom/tutor/tutor.router");
const studentRouter = require("./classroom/student/student.router");

app.use(express.json());

app.use("/classroom/tutor", tutorRouter);
app.use("/classroom/student", studentRouter);
port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on PORT : ", port);
});