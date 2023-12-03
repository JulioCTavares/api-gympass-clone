import { prisma } from '@/lib';
import { UsersRepository } from '@/usecases/repos';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository implements UsersRepository {
	async findById(id: string) {
		const user = await prisma.user.findFirst({
			where:{
				id
			}
		});

		return user;
	}
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		return user;
	}
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}
}