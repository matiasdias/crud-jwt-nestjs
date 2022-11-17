import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    index(): Promise<import("./usersEntity").UsersEntity[]>;
    store(body: CreateUserDto): Promise<import("./usersEntity").UsersEntity>;
    show(id: string): Promise<import("./usersEntity").UsersEntity>;
    update(id: string, body: UpdateUserDto): Promise<import("./usersEntity").UsersEntity>;
    delete(id: string): Promise<void>;
    newPassword(email: string): Promise<{
        message: string;
    }>;
}
