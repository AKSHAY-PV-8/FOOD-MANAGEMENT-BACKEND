import express from "express"
import { login, register } from "../controllers/auth.controller.js"


const autRoutes = express.Router()

autRoutes.post("/login", login)
autRoutes.post("/register", register);


export default autRoutes