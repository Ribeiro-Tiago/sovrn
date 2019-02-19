import { Router } from "restify-router";
import { getNumbers, deleteAll } from "../controllers/Misc";

const miscRoutes = new Router();

miscRoutes.get("/all/:numeralType", getNumbers);
miscRoutes.del("/remove/all", deleteAll);

export default miscRoutes; 