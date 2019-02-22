import { Router } from "restify-router";

import { getNumber } from "../controllers/Roman";

const romanRoutes = new Router();

romanRoutes.get("/roman/:number", getNumber);

export default romanRoutes; 