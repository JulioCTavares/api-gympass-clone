import { PrismaUsersRepository } from '@/repositories';
import { RegisterUseCase } from '../register.usecase';

export const makeRegisterUseCase = () => {
	const prismaUsersRepository = new PrismaUsersRepository();

	const registerUseCase = new RegisterUseCase(prismaUsersRepository);

	return registerUseCase;
};