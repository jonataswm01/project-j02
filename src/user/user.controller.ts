// Controller responsável por receber e processar requisições HTTP relacionadas a usuários
// Define as rotas da API e coordena as operações entre a requisição e o service

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

// Decorator @Controller define a rota base para este controller
// Todas as rotas deste controller começam com '/user'
@Controller('user')
export class UserController {
    // Injeção de dependência do UserService
    // O NestJS automaticamente injeta uma instância do UserService
    constructor(private readonly userService: UserService) {}

    // Decorator @Post define que este método responde a requisições POST
    // A rota completa será: POST /user/signup
    @Post('signup')
    async signupUser(
        // Decorator @Body extrai os dados do corpo da requisição HTTP
        @Body() userData: { name: string; email: string; password: string },
    ): Promise<User> {
        // Validação básica - verificar se userData existe e tem os campos obrigatórios
        if (!userData || !userData.name || !userData.email || !userData.password) {
            throw new Error('Name, email and password are required');
        }

        // Chama o service para criar o usuário no banco de dados
        return this.userService.createUser({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });
    }
}
