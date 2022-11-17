import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './usersEntity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersEntity>);
    create(data: CreateUserDto): Promise<UsersEntity>;
    find(): Promise<UsersEntity[]>;
    findOneBy(id: string): Promise<UsersEntity>;
    update(id: string, data: UpdateUserDto): Promise<UsersEntity>;
    delete(id: string): Promise<void>;
    findByEmail(email: string): Promise<UsersEntity>;
    forgoPassword(email: string): Promise<{
        message: string;
    }>;
}
