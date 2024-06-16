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

export async function getTotalReportNumber(username) {
  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(DISTINCT goal_id) as totalReport
      FROM text_reports
      WHERE username = ?
      GROUP BY username
      `,
      [username]
    );
    if (rows.length > 0) {
      const reportCount = rows[0].totalReport;
      return reportCount;
    } else {
      return 0; // No reports found
    }
  } catch (error) {
    console.error("Error fetching total report number:", error);
    throw error;
  }
}

export async function getTotalPlanNumber(username) {
  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(DISTINCT goal_id) as totalPlan
      FROM text_plans
      WHERE username = ?
      GROUP BY username
      `,
      [username]
    );
    if (rows.length > 0) {
      const planCount = rows[0].totalPlan;
      return planCount;
    } else {
      return 0; // No plans found
    }
  } catch (error) {
    console.error("Error fetching total plan number:", error);
    throw error;
  }
}
// Texual Report Addin to Database

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

export async function updateTextReports(userId, goalId, editedPlans) {
  try {
    // Fetch existing reports from the database
    const [existingPlans] = await db.query(
      `SELECT id, report_details
       FROM text_reports
       WHERE user_id = ? AND goal_id = ?
       ORDER BY id ASC`, // Assuming you want to order by ID
      [userId, goalId]
    );

    // Check if the number of editedPlans matches existingPlans
    if (editedPlans.length !== existingPlans.length) {
      throw new Error(
        "Number of edited reports does not match existing reports"
      );
    }

    // Update each report
    const updatePromises = existingPlans.map(async (report, index) => {
      const editedReport = editedPlans[index];
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

// -------------------------plan----------------------------

export async function addTextPlan(userId, goalId, username, textareas) {
  const planPromises = textareas.map((textarea) => {
    return db.query(
      `INSERT 
       INTO 
       text_plans (user_id, goal_id, username, plan_details) 
       VALUES (?, ?, ?,?)`,
      [userId, goalId, username, textarea]
    );
  });

  await Promise.all(planPromises);
}

// Update plan

export async function updateTextPlans(userId, goalId, editedPlans) {
  try {
    // Fetch existing plans from the database
    const [existingPlans] = await db.query(
      `SELECT id, plan_details
       FROM text_plans
       WHERE user_id = ? AND goal_id = ?
       ORDER BY id ASC`, // Assuming you want to order by ID
      [userId, goalId]
    );

    // Check if the number of editedPlans matches existingPlans
    if (editedPlans.length !== existingPlans.length) {
      throw new Error("Number of edited Plans does not match existing Plans");
    }

    // Update each plan
    const updatePromises = existingPlans.map(async (plan, index) => {
      const editedPlan = editedPlans[index];
      const planId = plan.id;

      // Perform update in the database
      await db.query(
        `UPDATE text_plans
         SET plan_details = ?
         WHERE id = ? AND user_id = ? AND goal_id = ?`,
        [editedPlan, planId, userId, goalId]
      );
    });

    // Execute all update promises
    await Promise.all(updatePromises);

    console.log("All Plans updated successfully");
  } catch (error) {
    console.error("Error updating Plans:", error);
    throw error;
  }
}

export async function viewTextPlan(userId, goalId) {
  try {
    const [plan] = await db.query(
      `
          SELECT plan_details
          FROM text_plans
          WHERE user_id = ? AND goal_id = ?
          `,
      [userId, goalId]
    );
    // console.log("Plan from database:", plan);
    return plan;
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw error; // Propagate the error to the caller
  }
}

// CSVIEW PLAN
export async function csViewTextPlan(goalId, department) {
  try {
    const [plan] = await db.query(
      `
          SELECT plan_details
          FROM text_plans
          WHERE goal_id = ? AND username = ?
          `,
      [goalId, department]
    );
    // console.log("Plan from database:", Plan);
    return plan;
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw error; // Propagate the error to the caller
  }
}

// ITVIEW PLAN
export async function itViewTextPlan(goalId, department) {
  try {
    const [plan] = await db.query(
      `
          SELECT plan_details
          FROM text_plans
          WHERE goal_id = ? AND username = ?
          `,
      [goalId, department]
    );
    // console.log("Plan from database:", plan);
    return plan;
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw error; // Propagate the error to the caller
  }
}

// ISVIEW PLAN
export async function isViewTextPlan(goalId, department) {
  try {
    const [plan] = await db.query(
      `
          SELECT plan_details
          FROM text_plans
          WHERE goal_id = ? AND username = ?
          `,
      [goalId, department]
    );
    console.log("Report from database:", plan);
    return plan;
  } catch (error) {
    console.error("Error fetching plan:", error);
    throw error; // Propagate the error to the caller
  }
}

//  Tabular Plan submission

export async function submitTabularPlan7(
  KPI,
  metrics,
  መነሻ_እቅድ,
  መድረሻ_እቅድ,
  ሶስት_ወራት_እቅድ,
  user_id,
  goal_id,
  username
) {
  const result = await db.query(
    `
INSERT INTO እቅድ_ግብ_7 (
      KPI,
      metrics,
      መነሻ_እቅድ,
      መድረሻ_እቅድ,
      ሶስት_ወራት_እቅድ,
      user_id,
      goal_id,
      username) 
VALUES(?,?,?,?,?,?,?,?) 
    `,
    [KPI, metrics, መነሻ_እቅድ, መድረሻ_እቅድ, ሶስት_ወራት_እቅድ, user_id, goal_id, username]
  );
  return result;
}

export async function viewTabularPlan7(userID, goalID, username) {
  const [result] = await db.query(
    `
    SELECT KPI, 
           metrics,
           መነሻ_እቅድ AS initial1,
           መድረሻ_እቅድ AS final1,
           ሶስት_ወራት_እቅድ AS threeMonthPlan1
    FROM እቅድ_ግብ_7
    WHERE user_id = ? AND goal_id = ? AND username = ? 
    `,
    [userID, goalID, username]
  );
  console.log("Goal 7 from database", result);
  return result;
}

export async function editPlanTable7DB(
  initial1,
  final1,
  threeMonthPlan1,
  userID,
  goalID,
  username
) {
  const result = await db.query(
    `
    UPDATE እቅድ_ግብ_7
    SET መነሻ_እቅድ = ?, መድረሻ_እቅድ = ?, ሶስት_ወራት_እቅድ = ?
    WHERE user_id = ? AND goal_id = ? AND username = ?
    `,
    [initial1, final1, threeMonthPlan1, userID, goalID, username]
  );
  return result;
}
export default db;
