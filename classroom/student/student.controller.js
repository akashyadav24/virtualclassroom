const {
    addStudent,
    getAllStudent,
    getStudentById,
    addAssignment,
    getAllAssignment,
    addSubmission,
    getStudentByUsername
} = require("./student.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    addStudent: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        addStudent(body, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        });
    },

    getAllStudent: (req, res) => {
        getAllStudent((err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data: result
            })
        });
    },

    getStudentById: (req, res) => {
        const id = req.params.id;
        getStudentById(id, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data: result
            })
        });
    },

    

    getAllAssignment: (req, res) => {
        getAllAssignment((err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data: result
            })
        });
    },

    addSubmission: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        body.student_id = id;
        addSubmission(body, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        });
    },

    login: (req,res) => {
        const body = req.body;
        //const salt = genSaltSync(10);
        //body.password = hashSync(body.password, salt);
        getStudentByUsername(body.username, (err, results ) => {
            if(err)
                console.log(err);
            if(!results) {
                return res.json({
                    success: 0,
                    data: "Invalid username or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.TOKEN_KEY, {
                    expiresIn: "2h"
                });
                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success:0,
                    data: "Error: Invalid username or password"
                });
            }         
        });
    },

    getAssignmentFeed: (req, res) => {
        getAssignmentFeed((err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!result) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data: result
            })
        });
    },
}