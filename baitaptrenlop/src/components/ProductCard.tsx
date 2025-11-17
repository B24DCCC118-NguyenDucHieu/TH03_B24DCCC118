import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div style={{border: '1px solid gray', padding: '8px', marginBottom: '8px'}}>
      <h3>{product.ten}</h3>
      <p>Giá: {product.gia.toLocaleString()} VND</p>
      <p>Số lượng: {product.soLuong}</p>
      <button onClick={() => navigate(`/products/${product.id}`)}>Xem chi tiết</button>
      <button onClick={() => navigate(`/edit/${product.id}`)} style={{ marginLeft: '8px' }}>Sửa</button>
    </div>
  );
};

export default ProductCard;
