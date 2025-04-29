import multer from "multer";

const storage = multer.diskStorage({});

const imageUploader = multer({ storage });

export default imageUploader;
