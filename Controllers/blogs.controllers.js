const Blog = require("../Models/blog");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createBlog = async (req, res) => {
  let resStatusCode = 200;
  let resMessage = "Blog created successfully.";
  try {
    Blog.init();
    const {
      email,
      blogData,
      title,
      desc,
      bannerImage,
      userImageUrl,
      name,
      tags,
    } = req.body;
    let bannerurl;
    if (bannerImage.includes("data:image/") && bannerImage.includes("base64")) {
      bannerurl = await cloudinary.uploader.upload(bannerImage, {});
      bannerurl = bannerurl.url;
    }
    await Blog.create({
      tags: tags,
      name: name,
      title: title,
      desc: desc,
      email: email,
      blogData: blogData,
      bannerImage: bannerurl || bannerImage,
      userImageUrl: userImageUrl,
    });
    return res.status(resStatusCode).send(resMessage);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      resStatusCode = 409;
      resMessage = "A blog with that same data already exists.";
    } else if (error.name === "ValidationError") {
      resStatusCode = 422;
      resMessage = "Required fields are missing.";
    } else {
      resStatusCode = 500;
      resMessage = "An unknown error occurred.";
    }
    return res.status(resStatusCode).send(resMessage);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).send("An unknown error occurred.");
  }
};

module.exports = { createBlog, getAllBlogs };