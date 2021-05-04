import { model, Schema, Model, Document } from 'mongoose';
import { ICard } from '../../domain/ports/Card.interface';

export interface ICardModel extends Document, ICard {}

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
  }
},{
  timestamps: true
});


export const CardModel: Model<ICardModel> = model<ICardModel>('card', CardSchema);
