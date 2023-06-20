'use client'

import React, { useEffect, useState } from 'react';
import Pagination from 'pagination';
import 'pagination/dist/index.css';

const Page: React.FC = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const jsonData = await response.json();
      setData(jsonData.products);
      setTotalPages(Math.ceil(jsonData.products.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            getPaginatedData().map((product: any) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* simple pagination with arrow */}
      <Pagination totalPages={totalPages} onChangePage={handleChangePage} space={''} variant={''} />

      {/* pagination with arrow and space */}
      <Pagination space totalPages={totalPages} onChangePage={handleChangePage} variant={""} />

      {/* pagination with button */}
      <Pagination variant="buttons" totalPages={totalPages} onChangePage={handleChangePage} space={''} />

      {/* pagination with button and space */}
      <Pagination variant="buttons" space totalPages={totalPages} onChangePage={handleChangePage} />
    </div>
  );
};

export default Page;

