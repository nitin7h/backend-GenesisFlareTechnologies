import express from "express";
import { home, leadData } from "../controllers/users/users.js";
import { adminLeads } from "../controllers/admin/admin.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const route = express.Router();

route.get("/", home)
route.post("/leadData", leadData)
route.post("/admin/leads", adminMiddleware, adminLeads)
// route.get("/admin/leads", adminMiddleware, adminLeads)

export default route