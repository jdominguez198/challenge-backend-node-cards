import { ICard } from './Card.interface';

export interface ICardsService {
  getById (cardId: string): Promise<ICard>,
  getAll (): Promise<ICard[]>,
  create (data: any): Promise<ICard|null>,
  update (data: any): Promise<boolean>
}
