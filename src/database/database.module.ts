// Módulo responsável pela configuração do banco de dados
// Centraliza a configuração do Prisma e disponibiliza o PrismaService para toda a aplicação

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  // providers: Array de serviços que este módulo fornece
  // O PrismaService é registrado aqui para ser injetado em outros módulos
  providers: [PrismaService],
  
  // exports: Array de serviços que este módulo exporta para outros módulos
  // O PrismaService fica disponível para qualquer módulo que importar o DatabaseModule
  exports: [PrismaService],
})
export class DatabaseModule {}
