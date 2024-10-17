import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary at the top level (to avoid redundant calls)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function cloudinaryUpload(fileUrl) {
  try {
    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileUrl, {
      folder: "Contactimages", // Save images in a specific folder
      resource_type: "image",  // Ensure only images are uploaded
    });

    console.log("Upload successful:", uploadResult);
    return uploadResult.secure_url; // Return the optimized URL

  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload failed. Please try again.");
  }
}

export { cloudinaryUpload };
