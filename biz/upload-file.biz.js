const config = require('config');
const helper = require('./../utils/helper');
const s3util = require('./../utils/s3.util');
const competitionRepo = require('../repository/competition.repo');

class UploadFileBiz {
    upload(file, full_name, email, mobile_no, age, dob, address, state, pincode, competition) {
        return new Promise(async (resolve, reject) => {
            try {
                const fileName = helper.constructFileName(file.name, full_name);
                const bucket = config.get('aws.bucket');

                await s3util.upload(fileName, bucket, file.data);
                const s3_path = `${bucket}/${fileName}`; 
                await competitionRepo.create(full_name, email, mobile_no, age, dob, address, state, pincode, competition, s3_path);
                return resolve({
                    message: 'Form submitted successfully!'
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

}

module.exports = UploadFileBiz;

