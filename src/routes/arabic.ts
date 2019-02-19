import { Router } from "restify-router";
import { getNumber } from "../controllers/arabic";

const arabicRoutes = new Router();

arabicRoutes.get("/arabic/:number", getNumber);

export default arabicRoutes;