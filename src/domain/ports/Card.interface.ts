export interface ICard {
  _id?: any,
  name: string,
  image: string,
  rarity: string,
  type: string,
  published: boolean,
  limitedQuantity?: number,
  createdAt?: string,
  updatedAt?: string
}
