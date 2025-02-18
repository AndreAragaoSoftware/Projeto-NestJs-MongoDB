# ✅ Passo a Passo: Criando um Projeto NestJS com MongoDB

## 🔹 **1️⃣ Criar o projeto NestJS**
```sh
npm install -g @nestjs/cli
nest new event-api
```
📌 **Escolha `npm` como gerenciador de pacotes**.

---

## 🔹 **2️⃣ Instalar as dependências**
Dentro do diretório do projeto, instale **Mongoose, ConfigModule e dotenv**:

```sh
cd event-api
npm install @nestjs/mongoose mongoose @nestjs/config dotenv
```

---

## 🔹 **3️⃣ Criar o módulo, controller e serviço**
Gerar os arquivos do evento:
```sh
nest generate module event
nest generate controller event
nest generate service event
```

---

## 🔹 **4️⃣ Criar o modelo/schema do banco**
Criar a pasta **`schema/`** dentro do módulo **event**:
```sh
mkdir src/event/schema
```
Criar o arquivo **`event.schema.ts`** dentro de `src/event/schema/` e definir os atributos do evento:

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hour: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  value: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
```

---

## 🔹 **5️⃣ Criar o repositório**
Criar a pasta **`repositories/`** dentro do módulo **event**:
```sh
mkdir src/event/repositories
```
Criar o arquivo **`create-event.repositorie.ts`** dentro de `src/event/repositories/`:

```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schema/event.schema';
import { Model } from 'mongoose';
import { IEventEntity } from '../interfaces/IEventEntity';

@Injectable()
export class CreateEventRepository {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async execute(event: IEventEntity): Promise<IEventEntity> {
    const createdEvent = new this.eventModel(event);
    await createdEvent.save();
    return createdEvent.toObject();
  }
}
```

---

## 🔹 **6️⃣ Criar a interface do evento**
Criar a pasta **`interfaces/`** dentro do módulo **event**:
```sh
mkdir src/event/interfaces
```
Criar o arquivo **`IEventEntity.ts`** dentro de `src/event/interfaces/`:

```ts
export interface IEventEntity {
  name: string;
  date: Date;
  hour: number;
  description: string;
  value: number;
}
```

---

## 🔹 **7️⃣ Criar o serviço**
Editar `src/event/services/create-event.service.ts`:

```ts
import { Injectable } from '@nestjs/common';
import { CreateEventRepository } from '../repositories/create-event.repositorie';
import { IEventEntity } from '../interfaces/IEventEntity';

@Injectable()
export class CreateEventService {
  constructor(private readonly createEventRepository: CreateEventRepository) {}

  async execute(event: IEventEntity): Promise<IEventEntity> {
    const newEvent = await this.createEventRepository.execute(event);
    return newEvent;
  }
}
```

---

## 🔹 **8️⃣ Criar o controller**
Editar `src/event/event.controller.ts`:

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventService } from './services/create-event.service';
import { IEventEntity } from './interfaces/IEventEntity';

@Controller('event')
export class EventController {
  constructor(private readonly createEventService: CreateEventService) {}

  @Post('create')
  async create(@Body() event: IEventEntity): Promise<IEventEntity> {
    return this.createEventService.execute(event);
  }
}
```

---

## 🔹 **9️⃣ Configurar o módulo do evento**
Editar `src/event/event.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { CreateEventRepository } from './repositories/create-event.repositorie';
import { CreateEventService } from './services/create-event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schema/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [EventController],
  providers: [CreateEventRepository, CreateEventService],
  exports: [CreateEventRepository, CreateEventService],
})
export class EventModule {}
```

---

## 🔹 **🔟 Criar o arquivo `.env`**
```sh
touch .env
```
Adicionar:
```
MONGO_URI=mongodb+srv://seu_usuario:sua_senha@cluster0.mongodb.net/event-api?retryWrites=true&w=majority
PORT=3000
```

---

## 🔹 **1️⃣1️⃣ Iniciar o servidor**
```sh
npm run start
```

Testar API:
```sh
curl -X POST http://localhost:3000/event/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Evento Teste",
    "date": "2025-02-18",
    "hour": 18,
    "description": "Teste de evento",
    "value": 50
  }'
```

---

## 🎯 **Conclusão**
✅ Criamos um **CRUD para eventos** com **NestJS e MongoDB**.
✅ Configuramos **MongooseModule.forRootAsync()** para carregar `.env` corretamente.
✅ Criamos **um repositório, serviço e controller** seguindo boas práticas.
✅ O projeto está pronto para ser expandido! 🚀🔥

