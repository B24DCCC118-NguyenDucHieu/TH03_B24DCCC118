import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Product } from '../types';

interface Props {
  existing?: Product;
  onClose: () => void;
}

export const ProductForm: React.FC<Props> = ({ existing, onClose }) => {
  const { state, dispatch } = useContext(ProductContext);

  const [ten, setTen] = useState(existing?.ten || '');
  const [danhMuc, setDanhMuc] = useState(existing?.danhMuc || '');
  const [gia, setGia] = useState(existing?.gia || 0);
  const [soLuong, setSoLuong] = useState(existing?.soLuong || 0);
  const [moTa, setMoTa] = useState(existing?.moTa || '');

  const handleSubmit = () => {
    if (!ten || ten.length < 3 || gia <= 0 || soLuong <= 0 || !danhMuc) {
      alert('Vui lòng nhập đúng thông tin');
      return;
    }

    const newProduct: Product = existing
      ? { ...existing, ten, danhMuc, gia, soLuong, moTa }
      : { id: Date.now(), ten, danhMuc, gia, soLuong, moTa };

    dispatch({ type: existing ? 'UPDATE' : 'ADD', payload: newProduct });
    onClose();
  };

  const handleDelete = () => {
    if (existing) {
      const confirmDelete = window.confirm('Bạn có chắc muốn xóa sản phẩm này không?');
      if (confirmDelete) {
        dispatch({ type: 'DELETE', payload: existing.id });
        onClose();
      }
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '8px', marginBottom: '8px', position: 'relative' }}>
      <h3>{existing ? 'Chỉnh sửa' : 'Thêm'} sản phẩm</h3>
      <input
        placeholder="Tên"
        value={ten}
        onChange={(e) => setTen(e.target.value)}
      />
      <input
        placeholder="Giá"
        type="number"
        value={gia}
        onChange={(e) => setGia(Number(e.target.value))}
      />
      <input
        placeholder="Số lượng"
        type="number"
        value={soLuong}
        onChange={(e) => setSoLuong(Number(e.target.value))}
      />
      <select value={danhMuc} onChange={(e) => setDanhMuc(e.target.value)}>
        <option value="">Chọn danh mục</option>
        <option value="Điện tử">Điện tử</option>
        <option value="Quần áo">Quần áo</option>
        <option value="Đồ ăn">Đồ ăn</option>
        <option value="Sách">Sách</option>
      </select>
      <textarea
        placeholder="Mô tả"
        value={moTa}
        onChange={(e) => setMoTa(e.target.value)}
      />
      <div style={{ marginTop: '8px' }}>
        <button onClick={handleSubmit}>{existing ? 'Lưu' : 'Thêm'}</button>
        <button onClick={onClose} style={{ marginLeft: '8px' }}>Hủy</button>
        {existing && (
          <button
            onClick={handleDelete}
            style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}
          >
            Xóa
          </button>
        )}
      </div>
      {existing && (
        <span style={{ position: 'absolute', bottom: '4px', right: '8px', fontSize: '0.8rem', opacity: 0.6 }}>
          ID: {existing.id}
        </span>
      )}
    </div>
  );
};

export default ProductForm;
