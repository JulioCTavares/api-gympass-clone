import { UserAlreadyExistsError } from '@/middlewares/errors';
import { PrismaUsersRepository } from '@/repositories';
import { RegisterUseCase } from '@/usecases';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';



export const register = async (req: FastifyRequest, reply: FastifyReply) => {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	});

	const {name, email, password} = registerBodySchema.parse(req.body);

	try  {
		const prismaUsersRepository = new PrismaUsersRepository();

		const registerUseCase = new RegisterUseCase(prismaUsersRepository);

		await registerUseCase.execute({name, email, password});


	} catch(err) {
		if (err instanceof UserAlreadyExistsError) {
			return reply.status(409).send({message: err.message});
		}

		return reply.status(500).send();
	}

	return reply.status(201).send();
};