# NestJS

NestJS é um framework para a construção de aplicações Node.js eficientes, confiáveis e escaláveis. Ele utiliza TypeScript como linguagem padrão, mas também oferece suporte total ao JavaScript puro. Inspirado em conceitos do Angular, NestJS é construído com base em módulos, o que facilita a organização e a manutenção do código.

## Principais Conceitos

### Módulos
Os módulos são a base da estrutura do NestJS. Cada aplicação NestJS possui pelo menos um módulo, o módulo raiz. Módulos são usados para agrupar componentes relacionados, como controladores e provedores.

### Controladores
Os controladores são responsáveis por lidar com as requisições HTTP e retornar as respostas apropriadas. Eles são decorados com `@Controller()` e contêm manipuladores de rotas que são decorados com métodos como `@Get()`, `@Post()`, `@Put()`, etc.

### Provedores
Os provedores são responsáveis pela lógica de negócios e podem ser injetados em controladores ou outros provedores usando o sistema de injeção de dependência do NestJS. Eles são decorados com `@Injectable()`.

### Serviços
Os serviços são um tipo comum de provedor que contém a lógica de negócios. Eles são geralmente injetados em controladores para separar a lógica de negócios da lógica de manipulação de requisições.

### Middleware
Os middlewares são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função middleware no ciclo de requisição-resposta da aplicação. Eles são usados para modificar requisições e respostas ou para executar código antes que a requisição chegue ao controlador.

### Guardas
As guardas são usadas para determinar se uma requisição será manipulada pelo controlador ou não. Elas são executadas antes dos middlewares e podem ser usadas para implementar autenticação e autorização.

### Filtros de Exceção
Os filtros de exceção são usados para capturar e manipular erros lançados dentro de uma aplicação NestJS. Eles permitem definir uma resposta personalizada para diferentes tipos de erros.

### Pipes
Os pipes são usados para transformar ou validar dados antes que eles sejam manipulados pelo controlador. Eles podem ser aplicados globalmente, a nível de controlador ou a nível de rota.

### Interceptadores
Os interceptadores são usados para adicionar lógica extra antes ou depois da execução do manipulador de rota. Eles podem ser usados para transformar a resposta, fazer logging, entre outras coisas.

## Exemplo Básico

Aqui está um exemplo básico de uma aplicação NestJS:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
```

Neste exemplo, temos um módulo (`AppModule`), um controlador (`AppController`) e um serviço (`AppService`). O controlador define uma rota GET que retorna uma string "Hello World!" usando o serviço.

## Configurando e Usando PrismaORM no NestJS

Prisma é um ORM (Object-Relational Mapping) moderno que facilita o trabalho com bancos de dados em aplicações Node.js e TypeScript. A seguir, veremos como configurar e usar o PrismaORM em uma aplicação NestJS.

### Instalação

Primeiro, instale as dependências necessárias:

```bash
npm install @nestjs/config @nestjs/prisma prisma
npm install @prisma/client
```

### Configuração do Prisma

Inicialize o Prisma no seu projeto:

```bash
npx prisma init
```

Isso criará um arquivo `prisma/schema.prisma` onde você pode definir seu esquema de banco de dados.

### Definindo o Esquema

Edite o arquivo `prisma/schema.prisma` para definir seu modelo de dados. Por exemplo:

```prisma
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

generator client {
    provider = "prisma-client-js"
}

model User {
    id    Int     @id @default(autoincrement())
    email String  @unique
    name  String?
}
```

### Configurando o Prisma Client

Após definir o esquema, gere o Prisma Client:

```bash
npx prisma generate
```

### Configurando o Módulo Prisma no NestJS

Crie um módulo Prisma no NestJS para gerenciar a conexão com o banco de dados. Por exemplo:

```typescript
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
```

Crie o serviço Prisma:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
```

### Usando o Prisma Service

Agora você pode injetar o `PrismaService` em seus controladores ou serviços:

```typescript
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('users')
export class UserController {
    constructor(private readonly prismaService: PrismaService) {}

    @Get()
    async getUsers() {
        return this.prismaService.user.findMany();
    }
}
```

### Executando Migrações

Para aplicar as mudanças no banco de dados, use as migrações do Prisma:

```bash
npx prisma migrate dev --name init
```

## Gerando CRUDs com NestCLI

A NestCLI é uma ferramenta poderosa que facilita a criação de componentes e a estruturação de projetos NestJS. Com ela, você pode gerar controladores, serviços, módulos e até mesmo operações CRUD completas. A seguir, veremos como usar a NestCLI para gerar um CRUD.

### Instalação da NestCLI

Se você ainda não tem a NestCLI instalada, pode instalá-la globalmente usando o npm:

```bash
npm install -g @nestjs/cli
```

### Criando um Novo Projeto

Para criar um novo projeto NestJS, use o comando `nest new`:

```bash
nest new my-project
```

### Gerando um Módulo

Primeiro, gere um módulo para o recurso que você deseja criar. Por exemplo, para um recurso `users`:

```bash
nest generate module users
```

### Gerando um CRUD

A NestCLI permite gerar um CRUD completo com um único comando. Para gerar um CRUD para o recurso `users`, use:

```bash
nest generate resource users
```

Você será solicitado a escolher entre diferentes opções de geração de CRUD. Escolha a opção desejada (por exemplo, REST API) e a NestCLI gerará automaticamente os controladores, serviços e módulos necessários.

### Estrutura Gerada

Após a execução do comando, a NestCLI criará a seguinte estrutura de arquivos:

```
src/
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
```

### Implementando o CRUD

A NestCLI gera código boilerplate para as operações CRUD. Você pode personalizar os arquivos gerados conforme necessário.

#### Controlador

O controlador (`users.controller.ts`) gerado conterá métodos para lidar com as requisições HTTP:

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
```

#### Serviço

O serviço (`users.service.ts`) gerado conterá a lógica de negócios para as operações CRUD:

```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
```