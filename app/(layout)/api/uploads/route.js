import multer from 'multer';
import nextConnect from 'next-connect';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import path from 'path';

// Setup storage for Multer
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads', // Folder to save the uploaded files
        filename: (req, file, cb) => {
            // Use uuid to create a unique filename
            cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Create a Next.js API route using next-connect
const apiRoute = nextConnect({
    // Handle any errors
    onError(error, req, res) {
        console.error(error); // Log the error for debugging
        res.status(501).json({ error: `Sorry, something happened! ${error.message}` });
    },
    // Handle unsupported methods
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// Use multer middleware to handle file upload
apiRoute.use(upload.single('file')); // 'file' should match the key used in FormData

// Handle POST request for file upload
apiRoute.post((req, res) => {
    console.log(req.file); // Log the uploaded file information
    const imageUrl = `/uploads/${req.file?.filename}`;
    res.status(200).json({ url: imageUrl });
});

export default apiRoute;

// Configuration to disable body parsing
export const config = {
    api: {
        bodyParser: false, // Important: Disable body parsing to handle multipart/form-data
    },
};
