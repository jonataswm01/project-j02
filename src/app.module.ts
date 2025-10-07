// Módulo raiz da aplicação NestJS
// Este é o módulo principal que importa todos os outros módulos da aplicação

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';      // Módulo de autenticação
import { UserModule } from './user/user.module';     // Módulo de usuários
import { DatabaseModule } from './database/database.module'; // Módulo do banco de dados

// Decorator @Module define que esta classe é um módulo NestJS
@Module({
  // imports: Array de módulos que este módulo importa
  // Todos os módulos listados aqui ficam disponíveis para toda a aplicação
  imports: [
    AuthModule,      // Módulo responsável por autenticação e autorização
    UserModule,      // Módulo responsável por operações de usuários
    DatabaseModule   // Módulo responsável pela conexão com o banco de dados
  ],
})
export class AppModule {}
