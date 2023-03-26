import express from "express";
import studentsRoutes from "./routes/students.routes.js";
import registersRoutes from "./routes/registers.routes.js";

const app = express();

app.use(express.json());

app.use("/api/", studentsRoutes);
app.use("/api/", registersRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

export default app