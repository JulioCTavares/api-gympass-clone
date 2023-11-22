import { hash } from 'bcrypt';
import { UsersRepository } from './repos';
import { UserAlreadyExistsError } from '@/middlewares';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({name, email, password}: RegisterUseCaseParams) {
		const passwordHashed = await hash(password, 10);

		const userAlreadyRegistered = await this.usersRepository.findByEmail(email);

		if (userAlreadyRegistered) {
			throw new UserAlreadyExistsError();
		}

		await this.usersRepository.create({name, email, password: passwordHashed});
	}
}