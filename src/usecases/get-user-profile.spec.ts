import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { InMemoryUsersRepository } from '@/repositories';
import { GetUserProfileUseCase } from './get-user-profile.usecase';
import { ResourceNotFound } from '@/middlewares/errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
	const generateFakeUserData = () => {
		return {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
	};
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it('should be able to get user profile', async () => {
		const userFakerData = generateFakeUserData();

		const createdUser = await usersRepository.create(userFakerData);

		const { user } = await sut.execute({userId: createdUser.id});

		expect(user.name).toEqual(userFakerData.name);

	});

	it('should not be able to get a user with wrong id', async () => {
		await expect(sut.execute({userId: 'non exists id'})
		).rejects.toBeInstanceOf(ResourceNotFound);
	});

}
);