import React, { createContext, useReducer } from 'react';
import { Product } from '../types';

interface ProductContextType {
  state: Product[];
  dispatch: React.Dispatch<any>;
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export const productReducer = (state: Product[], action: any) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    default:
      return state;
  }
};
