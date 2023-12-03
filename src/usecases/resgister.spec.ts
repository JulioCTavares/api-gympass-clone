import { beforeEach, describe, expect, it} from 'vitest';
import { RegisterUseCase } from './register.usecase';
import { faker } from '@faker-js/faker';
import { compare } from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories';
import { UserAlreadyExistsError } from '@/middlewares/errors';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
	const generateFakeUserData = () => {
		return {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
	};

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it('should be able to register a user', async () => {
		const userFakerDate = generateFakeUserData();

		const {user} = await sut.execute(userFakerDate);


		expect(user.id).toEqual(expect.any(String));
	});
	it('should hash user password upon registration', async () => {
		const userFakerDate = generateFakeUserData();

		const {user} = await sut.execute(userFakerDate);

		const isPasswordCorrectlyHashed = await compare(userFakerDate.password, user.password,);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});
	it('should not be able to register with same email duplicate', async () => {
		const email = faker.internet.email();

		const userFakerData = {
			name: faker.person.fullName(),
			email,
			password: faker.internet.password(),
		};

		await sut.execute(userFakerData);

		await expect(() => sut.execute(userFakerData)).rejects.toBeInstanceOf(UserAlreadyExistsError);


	});
}
);