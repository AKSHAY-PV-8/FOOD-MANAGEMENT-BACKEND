import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js"


const autRoutes = express.Router()

autRoutes.post("/login", login);
autRoutes.post("/register", register);
autRoutes.post("/logout", logout);


export default autRoutes