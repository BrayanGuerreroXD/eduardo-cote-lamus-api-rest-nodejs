import { pool } from "../db.js";

// Get all registers from DB
export const getRegisters = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Register");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get register by ID form DB
export const getRegister = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Register WHERE id =?", [
      req.params.id,
    ]);

    if (rows.length <= 0) {
      res.status(404).json({
        message: "Register not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get registers by student code form DB
export const getRegistersByStudent = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Register WHERE student_code =?",
      [req.params.code]
    );

    if (rows.length <= 0) {
      res.status(404).json({
        message: "Register not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Add register to DB
export const createRegister = async (req, res) => {
  try {
    const { student_code, entry_date } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Register (student_code, entry_date) VALUES (?, ?)",
      [student_code, entry_date]
    );
    res.send({
      student_code,
      entry_date
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update register in DB
export const updateRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_code, entry_date } = req.body;
    const [result] = await pool.query(
      "UPDATE Register SET student_code = IFNULL(?, student_code), entry_date = IFNULL(?, entry_date) WHERE id =?",
      [student_code, entry_date, id]
    );

    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "Register not found",
      });
    }

    const [rows] = await pool.query("SELECT * FROM Register WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Register from DB
export const deleteStudent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Register WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0) {
      res.status(404).json({
        message: "Register not found",
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
