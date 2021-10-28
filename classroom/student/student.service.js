const pool = require("../../config/database");

module.exports = {
    addStudent: (data, callBack) => {
        pool.query(
            `insert into users (username, password, usertype) values (?,?,'s')`,
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

    getAllStudent: callback => {
        pool.query(
            `select * from users where usertype='s'`,
            [],
            (err, result, field) => {
                if(err)
                    return callback(err);
                return callback(null, result);
            }
        );
    },

    getStudentById: (id, callback) => {
        pool.query(
            `select * from users where usertype='s' and user_id = ?`,
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
            `insert into assignment (ass_id, ass_desc, user_id, publish_date, due_date) values (?,?,?,?,?)`,
            [
                data.ass_id,
                data.ass_desc,
                data.user_id,
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

    addSubmission: (data, callBack) => {
        pool.query(
            `insert into submission (ass_id, student_id, link, date, remark) values (?,?,?,?,?)`,
            [
                data.ass_id,
                data.student_id,
                data.link,
                data.date,
                data.remark
            ],
            (err, result, fields)=> {
                if(err)
                    return callBack(err)
                return callBack(null, result)
            }
        );
    },

    getStudentByUsername: (username, callback) => {
        pool.query(
            `select * from users where usertype = 's' and username = ?`,
            [username],
            (err, result, fields) => {
                if(err)
                    return callback(err);
                return callback(null, result[0]);
            }
        );
    },

    getAssignmentFeed: (data, callback) => {
        pool.query(
            `select * from users where usertype = 's' and username = ?`,
            [

            ],
            (err, result, fields) => {
                if(err)
                    return callback(err);
                return callback(null, result);
            }
        );
    }
};