import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

export const initialize = () => {
    return new CDSServer().configureMiddleware();
};

export class CDSServer {
    /**
     * @method constructor
     * @description Setup defaults for the server instance
     */
    app: any;
    services: any;

    constructor() {
        this.app = express();
        this.services = [];
        return this;
    }

    /**
     * @method configureMiddleware
     * @description Enable all the standard middleware
     */
    configureMiddleware() {
        this.app.set('showStackError', true);
        this.app.set('jsonp callback', true);
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '50mb' }));

        this.app.use(cors());
        this.app.options('*', cors());

        return this;
    }

    // POST: Service endpoint
    registerService({ definition, handler }) {
        this.services.push(definition);
        this.app.post(`/cds-services/${definition.id}`, handler);
        return this;
    }

    // GET: Discovery endpoint
    listen({ port, discoveryEndpoint = '/cds-services' }, callback) {
        this.app.get(discoveryEndpoint, (req, res) => res.json({ services: this.services }));
        this.app.get('/', (req, res) => res.send('Sistema de CDS funcionando...'));
        this.app.listen(port, callback);

        return this;
    }
}

