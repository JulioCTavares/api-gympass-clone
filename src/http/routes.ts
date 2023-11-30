import { FastifyInstance } from 'fastify';
import { authenticate, register } from './controllers';

export const appRoutes = async (app: FastifyInstance) => {
	app.post('/users', register);
	app.post('/sessions', authenticate);
};