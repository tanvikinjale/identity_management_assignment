const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
    cloud_name: 'dkqm9ewib', 
    api_key: '491676714168244', 
    api_secret: '7M3QWS0aqCmvsIpt3k_chWB_H78' 
  });


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
        console.log(response.url);
        fs.unlinkSync(localFilePath); //remove locally saved file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove locally saved file
        throw new Error(error.message); 
        // return null
    }
}

module.exports = { uploadOnCloudinary };


