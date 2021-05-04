import { ICardModel } from "./CardModel.interface";

export interface ICardsService {
  getById (cardId: string): Promise<ICardModel>,
  getAll (): Promise<ICardModel[]>,
  create (data: any): Promise<ICardModel|null>,
  update (data: any): Promise<boolean>
}
