import { PrismaUsersRepository } from '@/repositories';
import { AuthenticateUseCase } from '../authenticate.usecase';

export const makeAuthenticateUseCase = () => {
	const prismaUsersRepository = new PrismaUsersRepository();

	const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

	return authenticateUseCase;
};