module.exports = {
    constructFileName: (file_name, full_name) => {
        const timeStamp = Date.now();
        let fileName = `${full_name}_${timeStamp}_${file_name}`;
        fileName = fileName.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
        fileName = encodeURIComponent(fileName);
        return fileName;
    }
}