import { createServer } from 'restify';
import romanRoutes from "./routes/Roman";
import arabicRoutes from "./routes/Arabic";

require('dotenv').config();

const server = createServer();

romanRoutes.applyRoutes(server);
arabicRoutes.applyRoutes(server);

server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});