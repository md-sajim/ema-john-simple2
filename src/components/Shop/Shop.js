import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quntaty = storedCart[id];
        addedProduct.quntaty = quntaty;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const addToCarthandal = (selecteProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product.id === selecteProduct.id);
    if (!exists) {
      selecteProduct.quntaty = 1;
      newCart = [...cart, selecteProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selecteProduct.id);
      exists.quntaty = exists.quntaty + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);

    addToDb(selecteProduct.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCarthandal={addToCarthandal}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
