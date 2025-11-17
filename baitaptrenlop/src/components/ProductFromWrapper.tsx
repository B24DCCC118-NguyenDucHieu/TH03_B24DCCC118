import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { ProductForm } from './ProductForm';

const ProductFormWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useContext(ProductContext);
  const navigate = useNavigate();

  const product = state.find(p => p.id.toString() === id);

  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  return <ProductForm existing={product} onClose={() => navigate('/')} />;
};

export default ProductFormWrapper;
