// Serviço responsável pela autenticação de usuários
// Contém a lógica de login, verificação de credenciais e geração de tokens

import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Decorator @Injectable marca esta classe como um serviço que pode ser injetado
@Injectable()
export class AuthService {
    
    // Injeção de dependência do UserService para acessar operações de usuários
    @Inject()
    private readonly userService: UserService;

    // Injeção de dependência do JwtService para a geração de tokens
    @Inject()
    private readonly jwtService: JwtService;

    // Método de login/autenticação
    // Recebe email e password, verifica as credenciais e retorna o usuário (sem senha)
    async signin(params: Prisma.UserCreateInput
    ): Promise<{ access_token: string }> {
        // Busca o usuário no banco de dados pelo email
        const user = await this.userService.User({ email: params.email });
        
        // Se usuário não encontrado, lança exceção 404
        if (!user) throw new NotFoundException('User not found');
        
        // Compara a senha fornecida com o hash armazenado no banco
        const passwordMatch = await bcrypt.compare(params.password, user.password);
        
        // Se senha não confere, lança exceção 401 (não autorizado)
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id };
        return { access_token: await this.jwtService.signAsync(payload) };

    }
}