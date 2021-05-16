const aws = require('aws-sdk');
const config = require('config');
const fs = require('fs');

const s3 = new aws.S3(config.get('aws.credentials'));

module.exports = {
    upload: (key, bucket, buffer) => new Promise(async (resolve, reject) => {
		try {
			s3.upload({
				Bucket: bucket,
				Key: key,
				ACL: 'private',
				Body: buffer,
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		} catch (error) {
			reject(error);
		}
	}),
}