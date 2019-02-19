import { createServer } from 'restify';
import romanRoutes from "./routes/roman";
import arabicRoutes from "./routes/arabic";

require('dotenv').config();

const server = createServer();

romanRoutes.applyRoutes(server);
arabicRoutes.applyRoutes(server);

server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});