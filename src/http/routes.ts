import { FastifyInstance } from 'fastify';
import { register } from './controllers';

export const appRoutes = async (app: FastifyInstance) => {
	app.post('/users', register);
};