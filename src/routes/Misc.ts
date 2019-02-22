import { Router } from "restify-router";

import { getAllOfType, deleteAll } from "../controllers/Misc";

const miscRoutes = new Router();

miscRoutes.get("/all/:numeralType", getAllOfType);
miscRoutes.del("/remove/all", deleteAll);

export default miscRoutes; 