// Controller responsável por receber e processar requisições HTTP relacionadas a usuários
// Define as rotas da API e coordena as operações entre a requisição e o service

import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
// Tipo personalizado UserModel baseado no User do Prisma type UserModel = User;

// Decorator @Controller define a rota base para este controller
// Todas as rotas deste controller começam com '/user'
@Controller('user')
export class UserController {
    // Injeção de dependência do UserService
    // O NestJS automaticamente injeta uma instância do UserService
    constructor(private readonly userService: UserService) {}

    // Decorator @Post define que este método responde a requisições POST
    // A rota completa será: POST /user/signup
    @UseGuards(AuthGuard)
    @Post()
    async signupUser(
        // Decorator @Body extrai os dados do corpo da requisição HTTP
       @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    // Decorator @Get define que este método responde a requisições GET
    // A rota completa será: GET /user/:id
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.User({ id: Number(id) });
    }


    @UseGuards(AuthGuard)
    @Put()
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id: Number(id) }, 
            data: userData,
        });
    }
    

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}
