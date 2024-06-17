import express from "express";
import authController from "../controllers/auth.js";
import auth from "../controllers/auth.js";
import { getAllUsers } from "../Database/database.js";
import { privileges } from "../views/utils.js";
const routerPages = express.Router();

routerPages.get("/", (req, res) => {
  res.render("login");
});
routerPages.get("/summary", authController.isLoggedIn, (req, res) => {
  if (req.user.email) {
    res.render("../views/LastText.hbs");
  } else {
    res.redirect("/");
  }
});

routerPages.get("/register", authController.isLoggedIn, (req, res) => {
  // res.render("../views/Admin/register.hbs");
  if (req.user && req.user.position === "admin") {
    res.render("../views/Admin/register.hbs");
  } else {
    res.redirect("/");
  }
});

routerPages.get("/deleteUser", authController.isLoggedIn, async (req, res) => {
  const message = req.query.message;
  if (req.user && req.user.position == "admin") {
    try {
      const users = await getAllUsers();
      res.render("../views/Admin/deleteUser", {
        message: message,
        users: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/");
  }
});

routerPages.get("/editUser", authController.isLoggedIn, async (req, res) => {
  console.log("From edit user router ", req.user);
  if (req.user && req.user.position === "admin") {
    try {
      const users = await getAllUsers();
      // console.log("All users: ", users);
      res.render("../views/Admin/editUser", {
        users: users,
      });
    } catch (error) {
      console.log("Error fetching users", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/");
  }
});

routerPages.get("/reportPDF", authController.isLoggedIn, (req, res) => {
  res.render("../views/Report/View_Report/informatics/reportPDF.hbs");
});
routerPages.get("/chart", (req, res) => {
  res.render("chart");
});

// const reportRoutes = [
//   { path: "createReport", count: 9, type: "TextualReport" },
//   { path: "viewReport", count: 9, type: "View_Report" },
//   { path: "goal", count: 9, type: "TabularReport" },
//   { path: "csViewReport", count: 9, type: "CS" },
//   { path: "isViewReport", count: 9, type: "IS" },
//   { path: "itViewReport", count: 9, type: "IT" },
// ];

// reportRoutes.forEach((route) => {
//   for (let i = 1; i <= route.count; i++) {
//     routerPages.get(
//       `/${route.path}${i}`,
//       authController.isLoggedIn,
//       (req, res) => {
//         if (req.user.username) {
//           res.render(
//             `../views/Report/Create_Report/${route.type}/${route.path}${i}`
//           );
//         } else {
//           res.redirect("/");
//         }
//       }
//     );
//   }
// });
// reportRoutes.forEach((route) => {
//   for (let i = 1; i <= route.count; i++) {
//     routerPages.get(
//       `/${route.path}${i}`,
//       authController.isLoggedIn,
//       (req, res) => {
//         if (req.user.username) {
//           res.render(
//             `../views/Report/Create_Report/${route.type}/${route.path}${i}`
//           );
//         } else {
//           res.redirect("/");
//         }
//       }
//     );
//   }
// });

// START OF >>> CREATE REPORT ROUTES
{
  routerPages.get("/createReport1", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport1");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport2", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport2");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport3", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport3");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport4", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport4");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport5", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport5");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport6", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport6");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport7", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport7");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport8", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport8");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createReport9", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TextualReport/createReport9");
    } else {
      res.redirect("/");
    }
  });
}
// END OF >>> CREATE REPORT ROUTES

// START OF VIEW REPORT ROUTES

{
  routerPages.get("/viewReport1", authController.isLoggedIn, (req, res) => {
    if (req.user && privileges.departmentHeads.includes(req.user.position)) {
      const goal_id = 1;
      console.log("Goal ID for viewReport1:", goal_id);
      res.render("../views/Report/View_Report/viewReport1", {
        goal_id: goal_id,
      });
    } else if (req.user && req.user.position === "informaticshead") {
      res.render("../views/informaticsDashboard.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/viewReport2", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 2;
      console.log("Goal ID for viewReport1:", goal_id);
      res.render("../views/Report/View_Report/viewReport2", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport3", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 3;
      res.render("../views/Report/View_Report/viewReport3", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport4", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 4;
      res.render("../views/Report/View_Report/viewReport4", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport5", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 5;
      res.render("../views/Report/View_Report/viewReport5", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport6", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 6;
      res.render("../views/Report/View_Report/viewReport6", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport7", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 7;
      res.render("../views/Report/View_Report/viewReport7", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport8", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 8;
      res.render("../views/Report/View_Report/viewReport8", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/viewReport9", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      const goal_id = 9;
      res.render("../views/Report/View_Report/viewReport9", {
        goal_id: goal_id,
      });
    } else {
      res.redirect("/");
    }
  });
}

// END OF VIEW REPORT ROUTES

// START OF TABULAR REPORT
{
  routerPages.get("/goal1Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal1Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal2Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal2Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal3Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal3Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal4Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal4Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal5Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal5Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal6Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal6Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal7Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal7Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal8Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal8Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal9Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Report/TabularReport/goal9Table.hbs");
    } else {
      res.redirect("/");
    }
  });
}
// END OF TABULAR REPORT

routerPages.get("/profile", authController.isLoggedIn, async (req, res) => {
  if (req.user.email) {
    res.render("profile", {
      firstName: req.user.first_name,
      lastName: req.user.last_name,
      email: req.user.email,
      position: req.user.privilege,
    });
  } else {
    res.redirect("/");
  }
});

routerPages.get("/userDashboard", authController.isLoggedIn, (req, res) => {
  // this means there is a user we grabbed from DB
  if (req.user.email) {
    // check if user is informarics HEAD
    if (privileges.facultyHeads.includes(req.user.position)) {
      res.render("../views/informaticsDashboard.hbs", {
        username: req.user.first_name,
      });
    } else if (req.user.position === "admin") {
      res.render("adminDashboard", {
        username: req.user.first_name,
      });
    } else {
      res.render("userDashboard", {
        username: req.user.first_name,
      });
    }
  } else {
    // if no user redirect to login page
    res.redirect("/");
  }
});

routerPages.get(
  "/informaticsViewReport",
  authController.isLoggedIn,
  (req, res) => {
    if (privileges.departmentHeads.includes(req.user.position)) {
      res.render(
        "../views/Report/View_Report/informatics/informaticsViewReport"
      );
    } else {
      res.redirect("/");
    }
    // if (req.user.position === "informaticshead") {
    //   res.render(
    //     "../views/Report/View_Report//informatics/informaticsViewReport.hbs"
    //   );
    // } else {
    //   res.redirect("/");
    // }
  }
);

// START OF CS VIEW REPORT ROUTES
{
  routerPages.get("/csViewReport1", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport1.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport2", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport2.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport3", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport3.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport4", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport4.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport5", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport5.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport6", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport6.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport7", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport7.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport8", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport8.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/csViewReport9", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/CS/csViewReport9.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
}

// END OF CS VIEW REPORT ROUTES

// START OF IS VIEW REPORT ROUTES
{
  routerPages.get("/isViewReport1", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport1.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport2", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport2.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport3", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport3.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport4", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport4.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport5", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport5.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport6", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport6.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport7", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport7.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport8", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport8.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/isViewReport9", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IS/isViewReport9.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
}

// END OF IS VIEW REPORT ROUTES

// START OF IT VIEW REPORT ROUTES
{
  routerPages.get("/itViewReport1", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport1.hbs"
      );
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/itViewReport2", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport2.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/itViewReport3", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport3.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/itViewReport4", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport4.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/itViewReport5", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport5.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/itViewReport6", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport6.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/itViewReport7", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport7.hbs"
      );
    }
  });
  routerPages.get("/itViewReport8", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport8.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/itViewReport9", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render(
        "../views/Report/View_Report/informatics/IT/itViewReport9.hbs"
      );
    } else {
      res.redirect("/");
    }
  });
}
// END OF IT VIEW REPORT ROUTES

// routerPages.get("*", (req, res) => {
//   res.render("errorPage");
// });

// planning

// -----------------------------------------------------------------------------
// =============================================================================

// START OF >>> CREATE PLAN ROUTES
{
  routerPages.get("/createPlan1", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan1.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/createPlan2", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan2");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan3", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan3");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan4", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan4");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan5", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan5");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan6", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan6");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan7", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan7");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan8", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan8");
    } else {
      res.redirect("/");
    }
  });
  routerPages.get("/createPlan9", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Plan/Create_Plan/createPlan9");
    } else {
      res.redirect("/");
    }
  });
}
// END OF >>> CREATE PLAN ROUTES

// START OF TABULAR Plan
{
  routerPages.get("/goal1Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal1Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal2Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal2Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal3Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal3Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal4Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal4Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal5Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal5Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal6Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal6Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal7Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal7Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal8Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal8Table.hbs");
    } else {
      res.redirect("/");
    }
  });

  routerPages.get("/goal9Table", authController.isLoggedIn, (req, res) => {
    if (req.user.email) {
      res.render("../views/Report/Create_Plan/TabularReport/goal9Table.hbs");
    } else {
      res.redirect("/");
    }
  });
}
// END OF TABULAR Plan

export default routerPages;
