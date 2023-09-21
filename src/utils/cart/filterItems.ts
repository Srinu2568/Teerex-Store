import { productDataInterface } from "../../store/productSlice";

export const filterItems = (cartData:productDataInterface[], id:number):productDataInterface[] => {
  const newCartData = cartData.map(
    (item:any) => {
      if (item.id === id) {
        return {
          ...item,
          productQuantity: (item.productQuantity += 1),
        };
      } else {
        return item;
      }
    }
  );
  return newCartData;
}