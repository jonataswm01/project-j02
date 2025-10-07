// Serviço responsável pela lógica de negócio relacionada a usuários
// Contém todas as operações CRUD (Create, Read, Update, Delete) para usuários

import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';

// Decorator @Injectable marca esta classe como um serviço que pode ser injetado
@Injectable()
export class UserService {
    // Injeção de dependência do PrismaService para acessar o banco de dados
    @Inject()
    private readonly prisma: PrismaService;

    // Busca um usuário único por critérios específicos (ex: ID, email)
    async User(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    
    // Busca múltiplos usuários com filtros opcionais
    async Users(
        userWhereInput: Prisma.UserWhereInput,
    ): Promise<User[]> {
        return this.prisma.user.findMany({
            where: userWhereInput,
        });
    }

    // Cria um novo usuário no banco de dados
    async createUser(data: Prisma.UserCreateInput) {
        try {
            // Hash da senha com salt rounds = 10
            const hashPassword = await bcrypt.hash(data.password, 10);

            // Cria o usuário com a senha hasheada
            return this.prisma.user.create({ 
                data: { 
                    ...data, 
                    password: hashPassword 
                } 
            });
        } catch (error) {
            // Log do erro para debug
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    // Atualiza um usuário existente
    // Recebe os critérios de busca (where) e os novos dados (data)
    async updateUser(params: {
     where: Prisma.UserWhereUniqueInput;
     data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    // Remove um usuário do banco de dados
    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }



}
