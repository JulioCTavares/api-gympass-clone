import fastify from 'fastify';
import { appRoutes } from './http';


export const app = fastify();

app.register(appRoutes);