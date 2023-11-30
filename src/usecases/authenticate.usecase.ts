import { InvalidCredentialsError } from '@/middlewares/errors';
import { UsersRepository } from './repos';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';



interface AuthenticateUseCaseParams {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
	constructor(
    private usersRepository: UsersRepository
	) {}

	async execute({email,password}: AuthenticateUseCaseParams): Promise<AuthenticateUseCaseResponse> {

		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordsMatches = await compare(password, user.password);

		if (!doesPasswordsMatches) {
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}