import { v2 as cloudinary } from 'cloudinary';

async function cloudinaryUpload(fileUrl) {

   
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET 
    });

   
    const uploadResult = await cloudinary.uploader
        .upload(fileUrl , {
            resource_type: "image"
        }
        )
        .catch((error) => {
            console.log(error);
            throw error
        });

    console.log(uploadResult);
    return uploadResult.secure_url

    // Optimize delivery by resizing and applying auto-format and auto-quality
    /*  const optimizeUrl = cloudinary.url('shoes', {
         fetch_format: 'auto',
         quality: 'auto'
     });
     
     console.log(optimizeUrl); */

    // Transform the image: auto-crop to square aspect_ratio
    /*  const autoCropUrl = cloudinary.url('shoes', {
         crop: 'auto',
         gravity: 'auto',
         width: 500,
         height: 500,
     });
     
     console.log(autoCropUrl);   */
};

export {cloudinaryUpload}