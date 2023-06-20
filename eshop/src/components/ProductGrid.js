import React from "react";
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onSelectProduct }) => {
  return (
    <>
    <div className='ml5 mr5'>
      <h1>Shop</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in 
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including 
        versions of Lorem Ipsum.</p>
    </div>
    <div className='grid-container'>
      {
        products.map((product) => {
          return (
            <ProductCard product={product} onSelectProduct={onSelectProduct} />
          );
        })
      }
    </div>
    </>
  );
}

export default ProductGrid;
