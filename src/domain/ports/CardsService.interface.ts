import { ICard } from './Card.interface';

export interface ICardsService {
  getById (cardId: string, owner: string): Promise<ICard>,
  getAll (owner: string): Promise<ICard[]>,
  create (data: any, owner: string): Promise<ICard|null>,
  update (data: any, owner: string): Promise<boolean>,
  fakesGenerator (owner: string, total: number): Promise<ICard[]> // Fake generator of cards to fill db
}
