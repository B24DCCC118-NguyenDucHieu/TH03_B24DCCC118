import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const { state } = useContext(ProductContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filtered = state.filter((p: Product) =>
    p.ten.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? p.danhMuc === filter : true) &&
    (minPrice === '' || p.gia >= minPrice) &&
    (maxPrice === '' || p.gia <= maxPrice)
  );

  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <button onClick={() => navigate('/add')} style={{ marginBottom: '12px' }}>
          Thêm sản phẩm
        </button>
        <input
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginRight: '8px' }}>
          <option value="">Tất cả danh mục</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
        </select>
        <input
          type="number"
          placeholder="Giá min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
          style={{ marginRight: '8px', width: '100px' }}
        />
        <input
          type="number"
          placeholder="Giá max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
          style={{ marginRight: '8px', width: '100px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <p>Tổng sản phẩm: {filtered.length}</p>
        <p>Trang {page} / {totalPages || 1}</p>
      </div>

      {paged.map((p: Product) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ProductList;
