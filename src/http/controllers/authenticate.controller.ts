import { InvalidCredentialsError } from '@/middlewares/errors';
import { PrismaUsersRepository } from '@/repositories';
import { AuthenticateUseCase } from '@/usecases';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';



export const authenticate = async (req: FastifyRequest, reply: FastifyReply) => {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	});

	const {email, password} = authenticateBodySchema.parse(req.body);

	try  {
		const prismaUsersRepository = new PrismaUsersRepository();

		const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

		await authenticateUseCase.execute({email, password});


	} catch(err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({message: err.message});
		}

		throw err;
	}

	return reply.status(200).send();
};