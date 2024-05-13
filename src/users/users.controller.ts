import { Controller, Post, Body, ConflictException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto/user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        try {
            return await this.usersService.createUser(createUserDto)
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException({
                    statusCode: HttpStatus.CONFLICT,
                    message: error.message
                },
                    error.stack
                );
            }
            throw error;
        }
    }
}
