// Módulo responsável por todas as operações relacionadas a usuários
// Organiza controllers, services e dependências do módulo de usuários

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';  // Controller que recebe as requisições HTTP
import { UserService } from './user.service';        // Service que contém a lógica de negócio
import { DatabaseModule } from '../database/database.module'; // Módulo do banco de dados

@Module({
  // imports: Módulos que este módulo precisa importar
  // DatabaseModule é importado para ter acesso ao PrismaService
  imports: [DatabaseModule],
  
  // controllers: Controllers que este módulo gerencia
  // UserController recebe e processa as requisições HTTP relacionadas a usuários
  controllers: [UserController],
  
  // providers: Serviços que este módulo fornece
  // UserService contém a lógica de negócio para operações de usuários
  providers: [UserService],
})
export class UserModule {}
