import { UsersRepository } from '@/usecases/repos';
import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];
	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: String(randomUUID()),
			name: data.name,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.users.push(user);

		return user;
	}
	async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

}