import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { LoginUserDto } from './dto/auth.dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } })
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(userRequest: LoginUserDto) {
        const user = await this.validateUser(userRequest.email, userRequest.password)

        if (user) {
            const payload = { email: user.email, sub: user.password };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }

        return new NotFoundException("user not found")

    }
}
