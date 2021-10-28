const {
    addTutor,
    getAllTutor,
    getTutorById,
    addAssignment,
    getAllAssignment,
    updateAssignment,
    deleteAssignment,
    getTutorByUsername
} = require("./tutor.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    addTutor: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        addTutor(body, (err, result) => {
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

    getAllTutor: (req, res) => {
        getAllTutor((err, result) => {
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

    getTutorById: (req, res) => {
        const id = req.params.id;
        getTutorById(id, (err, result) => {
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

    addAssignment: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        body.tutor_id = id;
        addAssignment(body, (err, result) => {
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

    updateAssignment: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const ass_id = req.params.ass_id;
        body.tutor_id = id;
        body.ass_id = ass_id;
        updateAssignment(body, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                message: "Data updated successfully"
            })
        });
    },

    deleteAssignment: (req, res) => {
        const data = req.body;
        const id = req.params.id;
        const ass_id = req.params.ass_id;
        data.tutor_id = id;
        data.ass_id = ass_id;
        deleteAssignment(data, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                message: "Assignment data deleted successfully"
            })
        });
    },

    login: (req,res) => {
        const body = req.body;
        //const salt = genSaltSync(10);
        //body.password = hashSync(body.password, salt);
        getTutorByUsername(body.username, (err, results ) => {
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
    }
}