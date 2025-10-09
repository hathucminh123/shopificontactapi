// api/index.js
import serverless from "serverless-http";
import app from "../src/app.js";
import { initDatabase } from "../src/models/index.js";
initDatabase();
 // app đã mount /api/contact
initDatabase();
export default serverless(app);
