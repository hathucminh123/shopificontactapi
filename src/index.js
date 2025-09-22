// api/index.js
import serverless from "serverless-http";
import app from "../src/app.js"; // app đã mount /api/contact

export default serverless(app);
