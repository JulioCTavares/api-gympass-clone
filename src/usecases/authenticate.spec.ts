import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories';
import { AuthenticateUseCase } from './authenticate.usecase';
import { InvalidCredentialsError } from '@/middlewares/errors';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
	const generateFakeUserData = () => {
		return {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
	};
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it('should be able to authenticate a user', async () => {
		const userFakerData = generateFakeUserData();

		await usersRepository.create({
			...userFakerData,
			password: await hash(userFakerData.password, 6)
		});

		const { user } = await sut.execute(userFakerData);

		expect(user.id).toEqual(expect.any(String));

	});

	it('should not be able authenticate with wrong email', async () => {
		const email = faker.internet.email();

		const userFakerData = {
			name: faker.person.fullName(),
			email,
			password: faker.internet.password(),
		};

		await expect(sut.execute({email: userFakerData.email, password: userFakerData.password})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should not be able authenticate with wrong password', async () => {
		const userFakerData = generateFakeUserData();

		await usersRepository.create({
			...userFakerData,
			password: await hash(userFakerData.password, 6)
		});

		await expect(sut.execute({email: userFakerData.email, password: '12345'})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

}
);