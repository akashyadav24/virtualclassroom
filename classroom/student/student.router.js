const {
    addStudent,
    getAllStudent,
    getStudentById,
    addAssignment,
    getAssignments,
    addSubmission,
    login
} = require("./student.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/Validation");

//router.get("/get-student", checkToken, getAllStudent);
//router.get("/get-student/:id", checkToken, getStudentById);
//router.post("/add-assignment", checkToken, addAssignment);
//router.get("/get-assignment", checkToken, getAllAssignment);
router.post("/add-student", addStudent);
router.post("/:id/add-submission", checkToken, addSubmission);
//router.post("/:id/assignments", checkToken, getAssignments);
router.post("/login", login);

module.exports = router;