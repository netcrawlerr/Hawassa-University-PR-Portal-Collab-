import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

db.getConnection()
  .then(() => {
    console.log("Connected to DB .......");
  })
  .catch((error) => {
    console.log("Error Connecting DB....\n\n", error);
  });

// get user by username
export async function getUser(username) {
  const [user] = await db.query(
    `SELECT *
     FROM
     users
     WHERE username = ?`,
    [username]
  );

  return user[0];
}

// get all users
export async function getAllUsers() {
  const [users] = await db.query(
    `SELECT * 
     FROM 
     users`
  );
  return users;
}

// get user by id
export async function getUserByID(id) {
  const [users] = await db.query(
    `SELECT *
     FROM
     users
     WHERE id = ?`,
    [id]
  );
  return users;
}

export async function deleteUserFromDB(username) {
  const result = await db.query(
    `
    DELETE FROM
    users 
    WHERE username = ?
    `,
    [username]
  );
  return result;
}
// add user [for ADMIN]
export async function addUser(
  username,
  password,
  firstName,
  lastName,
  email,
  position
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    ` 
        INSERT 
        INTO 
        users (username,password, firstName, lastName, email, position) 
        VALUES(?,?,?,?,?,?)`,
    [username, hashedPassword, firstName, lastName, email, position]
  );
  return {
    id: result[0].insertId,
    username,
    hashedPassword,
    firstName,
    lastName,
    email,
    position,
  };
}

export async function userDBUpdateProfile(
  username,
  firstName,
  lastName,
  email
) {
  const result = await db.query(
    `UPDATE users 
     SET
        firstName = ?,
        lastName = ?,
        email = ?
        WHERE username = ?
    `,
    [firstName, lastName, email, username]
  );
  return result;
}

export async function adminUpdateUserDB(
  username,
  firstName,
  lastName,
  password,
  position,
  email
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    `UPDATE users
     SET
        username = ?,
        firstName = ?,
        lastName = ?,
        password = ?,
        position = ?,
        email = ?
      WHERE username = ?
    `,
    [username, firstName, lastName, hashedPassword, position, email, username]
  );
  console.log("Updated");
  return result;
}

// Texual Report Addin to Databasez

export async function addTextReport(userId, goalId, username, textareas) {
  const reportPromises = textareas.map((textarea) => {
    return db.query(
      `INSERT 
       INTO 
       text_reports (user_id, goal_id, username, report_details) 
       VALUES (?, ?, ?,?)`,
      [userId, goalId, username, textarea]
    );
  });

  await Promise.all(reportPromises);
}

// Update report

export async function updateTextReports(userId, goalId, editedReports) {
  try {
    // Fetch existing reports from the database
    const [existingReports] = await db.query(
      `SELECT id, report_details
       FROM text_reports
       WHERE user_id = ? AND goal_id = ?
       ORDER BY id ASC`, // Assuming you want to order by ID
      [userId, goalId]
    );

    // Check if the number of editedReports matches existingReports
    if (editedReports.length !== existingReports.length) {
      throw new Error(
        "Number of edited reports does not match existing reports"
      );
    }

    // Update each report
    const updatePromises = existingReports.map(async (report, index) => {
      const editedReport = editedReports[index];
      const reportId = report.id;

      // Perform update in the database
      await db.query(
        `UPDATE text_reports
         SET report_details = ?
         WHERE id = ? AND user_id = ? AND goal_id = ?`,
        [editedReport, reportId, userId, goalId]
      );
    });

    // Execute all update promises
    await Promise.all(updatePromises);

    console.log("All reports updated successfully");
  } catch (error) {
    console.error("Error updating reports:", error);
    throw error;
  }
}

export async function getID(username) {
  const result = db.query(
    `
    SELECT id 
    FROM text_reports
    WHERE username = ?
    `,
    [username]
  );
  return result;
}

// View Textual reporting

export async function viewTextReport(userId, goalId) {
  try {
    const [report] = await db.query(
      `
          SELECT report_details
          FROM text_reports
          WHERE user_id = ? AND goal_id = ?
          `,
      [userId, goalId]
    );
    // console.log("Report from database:", report);
    return report;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error; // Propagate the error to the caller
  }
}

// CSVIEW REPORT
export async function csViewTextReport(goalId, department) {
  try {
    const [report] = await db.query(
      `
          SELECT report_details
          FROM text_reports
          WHERE goal_id = ? AND username = ?
          `,
      [goalId, department]
    );
    // console.log("Report from database:", report);
    return report;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error; // Propagate the error to the caller
  }
}

// ITVIEW REPORT
export async function itViewTextReport(goalId, department) {
  try {
    const [report] = await db.query(
      `
          SELECT report_details
          FROM text_reports
          WHERE goal_id = ? AND username = ?
          `,
      [goalId, department]
    );
    // console.log("Report from database:", report);
    return report;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error; // Propagate the error to the caller
  }
}

// ISVIEW REPORT
export async function isViewTextReport(goalId, department) {
  try {
    const [report] = await db.query(
      `
          SELECT report_details
          FROM text_reports
          WHERE goal_id = ? AND username = ?
          `,
      [goalId, department]
    );
    console.log("Report from database:", report);
    return report;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error; // Propagate the error to the caller
  }
}

export default db;
