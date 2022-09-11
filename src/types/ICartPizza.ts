import IPizza from './IPizza';

export default interface ICartPizza extends IPizza {
  type: string;
  quantity: number;
  size: number;
}
