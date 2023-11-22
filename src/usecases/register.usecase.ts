import { prisma } from '@/lib';
import { PrismaUsersRepository } from '@/repositories';
import { hash } from 'bcrypt';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export const registerUseCase = async ({name, email, password}: RegisterUseCaseParams) => {
	const passwordHashed = await hash(password, 10);

	const userAlreadyRegistered = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (userAlreadyRegistered) {
		throw new Error('Email already registered');
	}

	const prismaUsersRepository = new PrismaUsersRepository();

	await prismaUsersRepository.create({name, email, password: passwordHashed});
};