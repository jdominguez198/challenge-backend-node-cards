import { model, Schema, Model, Document } from 'mongoose';
import { ICardModel } from '../../api/cardModel.interface';

export interface ICard extends Document, ICardModel {}

const CardSchema: Schema = new Schema({
  name: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: false,
    default: ''
  },
  rarity: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: 'regular'
  },
  published: {
    type: Boolean,
    required: false,
    default: false
  },
  limitedQuantity: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const CardModel: Model<ICard> = model<ICard>('card', CardSchema);
