import { IProduct } from './interfaceProduct';

export interface IProductInCart extends IProduct{
      orderQuantity: number;
}
