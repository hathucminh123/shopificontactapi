import app from "./app.js";
import dotenv from "dotenv";
import { initDatabase } from "./models/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

await initDatabase();
app.get("/", (req, res) => res.send("🚀 VSNR API running with Role → User (1:N)"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
