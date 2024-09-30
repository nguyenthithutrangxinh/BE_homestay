const uploadSingleImage = async (req, res) => {
  try {
    // Kiểm tra nếu có hình ảnh được upload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Lấy đường dẫn của ảnh đã upload
    const imagePath = req.file.path;

    // Trả về thông tin của ảnh đã upload
    res.status(200).json({
      message: "Image uploaded successfully",
      image: {
        filename: req.file.originalname,
        path: imagePath,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadSingleImage,
};
