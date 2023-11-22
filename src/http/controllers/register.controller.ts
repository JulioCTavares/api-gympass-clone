import { registerUseCase } from '@/usecases';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';



export const register = async (req: FastifyRequest, reply: FastifyReply) => {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});

	const {name, email, password} = registerBodySchema.parse(req.body);

	await registerUseCase({name, email, password});

	return reply.status(201).send();
};