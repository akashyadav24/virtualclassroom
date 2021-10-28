const pool = require("../../config/database");

module.exports = {
    addTutor: (data, callBack) => {
        pool.query(
            `insert into users (username, password, usertype) values (?,?,'t')`,
            [
                data.username,
                data.password,
            ],
            (err, result, fields)=> {
                if(err)
                    return callBack(err)
                return callBack(null, result)
            }
        );
    },

    getAllTutor: callback => {
        pool.query(
            `select * from users where usertype='t'`,
            [],
            (err, result, field) => {
                if(err)
                    return callback(err);
                return callback(null, result);
            }
        );
    },

    getTutorById: (id, callback) => {
        pool.query(
            `select * from users where usertype='t' and user_id = ?`,
            [id],
            (err, result, field) => {
                if(err)
                    return callback(err);
                return callback(null, result[0]);
            }
        );
    },

    addAssignment: (data, callBack) => {
        pool.query(
            `insert into assignment (ass_desc, tutor_id, student_ids, publish_date, due_date) values (?,?,?,?,?)`,
            [
                data.ass_desc,
                data.tutor_id,
                data.student_ids,
                data.publish_date,
                data.due_date
            ],
            (err, result, fields)=> {
                if(err)
                    return callBack(err)
                return callBack(null, result)
            }
        );
    },

    getAllAssignment: callback => {
        pool.query(
            `select * from assignment`,
            [],
            (err, result, field) => {
                if(err)
                    return callback(err);
                return callback(null, result);
            }
        );
    },

    updateAssignment: (data, callBack) => {
        pool.query(
            `update assignment set ass_desc=?, tutor_id=?, student_ids=?, publish_date=?, due_date=? where ass_id=?`,
            [
                data.ass_desc,
                data.tutor_id,
                data.student_ids,
                data.publish_date,
                data.due_date,
                data.ass_id
            ],
            (err, result, fields)=> {
                if(err)
                    return callBack(err)
                return callBack(null, result)
            }
        );
    },

    deleteAssignment: (data, callBack) => {
        pool.query(
            `delete from assignment where tutor_id = ? and ass_id=?`,
            [
                data.tutor_id,
                data.ass_id
            ],
            (err, result, fields)=> {
                if(err)
                    return callBack(err)
                return callBack(null, result[0])
            }
        );
    },

    getTutorByUsername: (username, callback) => {
        pool.query(
            `select * from users where usertype = 't' and username = ?`,
            [username],
            (err, result, fields) => {
                if(err)
                    return callback(err);
                return callback(null, result[0]);
            }
        );
    }
};