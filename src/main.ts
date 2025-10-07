// Arquivo principal da aplicação NestJS
// Este é o ponto de entrada da aplicação, onde tudo começa

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Função bootstrap - inicializa a aplicação NestJS
async function bootstrap() {
  // Cria uma instância da aplicação NestJS usando o AppModule como raiz
  const app = await NestFactory.create(AppModule);
  
  // Inicia o servidor na porta definida na variável de ambiente PORT
  // Se não houver PORT definida, usa a porta 3000 como padrão
  await app.listen(process.env.PORT ?? 3000);
}

// Executa a função bootstrap para iniciar a aplicação
bootstrap();
