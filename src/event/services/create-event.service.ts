import { Injectable } from '@nestjs/common';
import { CreateEventRepositorie } from '../repositories/create-event.repositorie';
import { IEventEntity } from '../interfaces/IEventEntity';

@Injectable()
export class CreateEventService {
  constructor(
    private readonly createEventRepositorie: CreateEventRepositorie,
  ) {}
  async execute(event: IEventEntity): Promise<IEventEntity> {
    const newEvent = await this.createEventRepositorie.execute(event);
    return newEvent;
  }
}
