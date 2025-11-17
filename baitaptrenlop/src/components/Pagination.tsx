import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {pages.map((p) => (
        <button
          key={p}
          disabled={p === page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
