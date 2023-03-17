import express from "express";
import { Login } from "../controllers/auth";

const router = express.router();

router.post("./login", login);

export default router;
