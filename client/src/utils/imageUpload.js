export const checkImage = (file) => {
    let err = ""
    if (!file)
        err = "File does not exists"

    if (!file.size)
        err = "Invalid File Size"

    if (file.size > 1024 * 1024 * 2 )
        err = "File is larger than 2mb"

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "File format is incorrect"

    return err;
}


export const ImageUpload = async (image) => {
    let imgArr = []
    for (const item of image) {
        const formData = new FormData()
        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }
        formData.append('upload_preset', 'egehdlwq')
        formData.append('cloud_name', 'programminghero')
        const res = await fetch("https://api.cloudinary.com/v1_1/programminghero/auto/upload", { method: "POST", body: formData })
        const data = await res.json()
        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr
}