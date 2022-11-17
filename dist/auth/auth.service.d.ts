import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/usersEntity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(user: any): Promise<{
        acess_token: string;
    }>;
    validateUser(email: string, password: string): Promise<UsersEntity>;
}
