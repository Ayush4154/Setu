
const mysql = require('./../db/mysql');
module.exports = {
    create: (full_name, email, mobile_no, age, dob, address, state, pincode, competition, s3_path) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = 'INSERT into user_competition(full_name, email, mobile_no, age, dob, address, location, pincode, competition, s3_path) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const response = await mysql.execute(query, [full_name, email, mobile_no, age, dob, address, state, pincode, competition, s3_path]);
                if (response) return resolve(true);
                return reject(false);
            } catch (error) {
                return reject(error);
            }
        });
    }
}