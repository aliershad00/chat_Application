//This is for upload profile photo
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`

//function for upload profile_photo to the cloud
const uploadFile = async(file) => {
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","chat-app-file")

//api for upload profile_photo
const response =await fetch(url,{
    method :'post',
    body: formData
})
const responseData =await response.json()
return responseData

}
export default uploadFile;

//create account on cloudinary
//use the cloudinary cloud name and 