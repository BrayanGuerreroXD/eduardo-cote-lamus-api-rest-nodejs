import { pool } from "../db.js";

// Get all students from DB
export const getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Student");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get student by ID form DB
export const getStudent = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Student WHERE code =?", [
      req.params.id,
    ]);

    if (rows.length <= 0) {
      res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Add student to DB
export const createStudent = async (req, res) => {
  try {
    const { code, name, lastname, career } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Student (code, name, lastname, career) VALUES (?, ?, ?, ?)",
      [code, name, lastname, career]
    );
    res.send({
      code: rows.insertId,
      name,
      lastname,
      career
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update student in DB
export const updateStudent = async (req, res) => {
  try {
    const { code } = req.params;
    const { name, lastname, career } = req.body;
    const [result] = await pool.query(
      "UPDATE Student SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), career = IFNULL(?, career) WHERE code =?",
      [name, lastname, career, code]
    );

    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "Student not found",
      });
    }

    const [rows] = await pool.query("SELECT * FROM Student WHERE code = ?", [
      code,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Student from DB
export const deleteStudent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Student WHERE code = ?", [
      req.params.code,
    ]);

    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "Student not found",
      });
    }

    // Deletion successful, no response content
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};