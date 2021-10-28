const {
    addTutor,
    getAllTutor,
    getTutorById,
    addAssignment,
    getAllAssignment,
    updateAssignment,
    deleteAssignment,
    login
} = require("./tutor.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/Validation");

//router.get("/get-tutor/:id", checkToken, getTutorById);
//router.get("/:id/get-assignments/", checkToken, getAllAssignment);
router.post("/add-tutor", addTutor);
//router.get("/get-tutor/", checkToken, getAllTutor);
router.post("/:id/add-assignment", checkToken, addAssignment);
router.patch("/:id/update-assignment/:ass_id", checkToken, updateAssignment);
router.delete("/:id/delete-assignment/:ass_id", checkToken, deleteAssignment);
router.post("/login", login);

module.exports = router;