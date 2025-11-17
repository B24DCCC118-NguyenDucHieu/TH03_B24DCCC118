import React, { useReducer, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { ProductContext, productReducer } from './context/ProductContext';
import { initialProducts } from './data';
import ProductList from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { Product } from './types';

const ProductFormWrapper: React.FC<{ isAdd?: boolean }> = ({ isAdd }) => {
  const { state } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const product = state.find(p => p.id.toString() === id);

  if (!isAdd && !product) return <p>Không tìm thấy sản phẩm</p>;

  return (
    <ProductForm
      existing={isAdd ? undefined : product}
      onClose={() => navigate('/')}
    />
  );
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(productReducer, initialProducts);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="container">
          <h1>Quản lý sản phẩm</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<ProductFormWrapper isAdd={true} />} />
            <Route path="/edit/:id" element={<ProductFormWrapper />} />
            <Route path="/products/:id" element={<p>Chi tiết sản phẩm sẽ hiển thị ở đây</p>} />
          </Routes>
        </div>
      </Router>
    </ProductContext.Provider>
  );
};

export default App;
