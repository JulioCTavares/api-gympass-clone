import { hash } from 'bcrypt';
import { UsersRepository } from './repos';
import { UserAlreadyExistsError } from '@/middlewares';
import type { User } from '@prisma/client';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({name, email, password}: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
		const passwordHashed = await hash(password, 10);

		const userAlreadyRegistered = await this.usersRepository.findByEmail(email);

		if (userAlreadyRegistered) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.usersRepository.create({name, email, password: passwordHashed});

		return {
			user
		};
	}
}