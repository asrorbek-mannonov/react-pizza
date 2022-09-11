export default interface IPizza {
  id: number;
  imageUrl: string;
  name: string;
  types: Array<number>;
  price: number;
  category: number;
  rating: number;
  sizes: Array<number>;
}
