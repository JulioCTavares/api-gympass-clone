import { ResourceNotFound } from '@/middlewares/errors/resource-not-found-error';
import { UsersRepository } from '@/usecases/repos';
import { User } from '@prisma/client';


interface GetUserProfileUseCaseParams {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}


export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({userId}: GetUserProfileUseCaseParams): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFound();
		}

		return {
			user
		};
	}
}