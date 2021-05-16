
const UploadFileBiz = require('./../biz/upload-file.biz');

class Registration {
    async register(request, response, next) {
        try {
            const body = request.body;
            const contentType = request.headers['content-type'];
            let file = null;
            if (contentType.indexOf('multipart/form-data') > -1) {
                if (!request.files) {
                    throw new MissingParamException('file');
                }

                file = request.files.file;
                const mimeType = file.mimetype;
                const supportedMimeType = ['video/mp4', 'video/mov', ''];
                if (!supportedMimeType.includes(mimeType)) {
                    throw new Error('File type not valid, should be of mp4');
                }
            }
            if (contentType === 'application/json') {
                file = {
                    name: request.body.filename,
                    data: new Buffer.from(request.body.filedata, 'base64'),
                };
            }

            if (!file) {
                throw new Error('Missing video file!!');
            }

            const {
                full_name,
                email,
                mobile_no,
                age,
                dob,
                address,
                state,
                pincode,
                competition,
            } = body;

            const uploadFileBiz = new UploadFileBiz();
            const data = await uploadFileBiz.upload(file, full_name, email || null, mobile_no, age, dob, address, state, pincode, competition);

            response.json({
                success: true,
                data,
            });

        } catch (error) {
            response.json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }  
}

module.exports = Registration;