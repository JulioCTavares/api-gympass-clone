import { describe, expect, it} from 'vitest';
import { RegisterUseCase } from './register.usecase';
import { faker } from '@faker-js/faker';
import { compare } from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories';
import { UserAlreadyExistsError } from '@/middlewares/errors';

describe('Register Use Case', () => {
	const generateFakeUserData = () => {
		return {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
	};

	it('should be able to register a user', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);
		
		const userFakerDate = generateFakeUserData();

		const {user} = await registerUseCase.execute(userFakerDate);


		expect(user.id).toEqual(expect.any(String));
	});
	it('should hash user password upon registration', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);

		const userFakerDate = generateFakeUserData();

		const {user} = await registerUseCase.execute(userFakerDate);

		const isPasswordCorrectlyHashed = await compare(userFakerDate.password, user.password,);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});
	it('should not be able to register with same email duplicate', async () => {
		const usersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);

		const email = faker.internet.email();

		const userFakerData = {
			name: faker.person.fullName(),
			email,
			password: faker.internet.password(),
		};

		await registerUseCase.execute(userFakerData);

		await expect(() => registerUseCase.execute(userFakerData)).rejects.toBeInstanceOf(UserAlreadyExistsError);


	});
}
);