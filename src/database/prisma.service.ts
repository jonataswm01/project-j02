// Serviço responsável pela conexão com o banco de dados usando Prisma
// Este serviço estende o PrismaClient e gerencia a conexão com o banco

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Decorator @Injectable marca esta classe como um serviço que pode ser injetado
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Método executado automaticamente quando o módulo é inicializado
  // Estabelece a conexão com o banco de dados
  async onModuleInit() {
    // Conecta ao banco de dados usando a string de conexão do .env
    await this.$connect();
  }
}
