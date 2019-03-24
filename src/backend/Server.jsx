import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { errorHandlerRoute, notFoundRoute } from './routes';

export default class Server {
	constructor(config) {
		this.config = config;
		this.app = new Express();
		this.run = this.run.bind(this);
	}

  get application() {
    return this.app;
  }

  bootstrap() {
    this.initHelmet();
    this.initCompress();
    this.initCookieParser();
    this.initCors();
    this.initJsonParser();
    return this;
  }

  run() {
    const { port, env } = this.config;
    const serverr = this.app.listen(port, () => {
      console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
    });
    this.server.installSubscriptionHandlers(serverr);
    return this;
  }

  async setupApollo(data) {
    const { app } = this;
    this.server = new ApolloServer(data);
    this.server.applyMiddleware({ app });
    this.run();
  }

  setupRoutes() {
    this.app.use('/health-check', (req, res) => {
      res.send('I am OK');
    });
    this.app.use(notFoundRoute);
    this.app.use(errorHandlerRoute);
  }

  initCompress() {
    this.app.use(compress());
  }

  initCookieParser() {
    this.app.use(cookieParser());
  }

  initCors() {
		const corsOptions = {
			origin: '*',
			optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		}
    this.app.use(cors(corsOptions));
  }

  initHelmet() {
    this.app.use(helmet());
  }

  initJsonParser() {
    this.app.use(bodyParser.json({
      limit: '50mb',
    }));
    this.app.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 100000,
    }));
  }
}