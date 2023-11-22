import fastify from 'fastify';
import { appRoutes } from './http';
import { ZodError } from 'zod';
import { env } from './env';


export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, req, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: 'Validation error', issue: error.format()});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	}

	return reply.status(500).send({ message: 'Internal Server Error'});
});