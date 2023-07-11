import React, { useState } from 'react';

import Root, { loader as rootLoader } from './Root';

import Cart, { loader as cartLoader, action as cartAction } from '../components/cart/Cart';
import SignIn from '../components/signin/SignIn';
import Register from '../components/register/Register';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import ErrorPage from '../components/ErrorPage';

import Shop from '../components/shop/Shop';
import ShopHome from '../components/shop/ShopHome';
import ProductGrid from "../components/shop/ProductGrid";
import ProductView, { action as productViewAction } from "../components/shop/ProductView";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css';

function App() {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  // const onAddToCart = (id, qty) => {
  //   const newCart = [...cart];
  //   const i = newCart.findIndex(item => item.id === id);
  //   if (i > -1) { // id already in cart
  //     newCart[i].qty += qty;
  //   } else { // id not in cart already
  //     newCart.push(
  //       { id: id, qty: qty }
  //     )
  //   }
  //   setCart(newCart);
  //   window.alert("Added to Cart");
  //   console.log(id, qty);
  //   console.log(cart);
  // }

  // const onDeleteFromCart = (id) => {
  //   const newCart = [...cart];
  //   const i = newCart.findIndex(item => item.id === id);
  //   try {
  //     newCart.splice(i, 1);
  //   } catch {
  //     window.alert('Error deleting item');
  //   }
  //   setCart(newCart);
  // }

  const onSignIn = (user) => {
    loadUser(user);
    setIsSignedIn(true);
  }

  const onSignOut = async () => {
    const response = await fetch('http://localhost:3000/signout', {
      method: "GET",
      credentials: "include",
    });
    loadUser({});
    setIsSignedIn(false);
  }

  const onRegister = () => {
    loadUser({});
    setIsSignedIn(false);
  }

  const loadUser = (userData) => {
    setUser({
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name
    });
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root onSignOut={onSignOut} isSignedIn={isSignedIn} user={user} cart={cart} />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: rootLoader,
      children: [
        {
          // This causes the error element to display in the right pane (i.e. as a child of root)
          // Without this, you get the entire page as an error (i.e. the error element in root is rendered)
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Home /> },
            {
              path: 'about/',
              element: <About />,
            },
            {
              path: 'contact/',
              element: <Contact />,
            },
            {
              path: 'shop/',
              element: < Shop />,
              children: [
                { index: true, element: <ShopHome /> },
                {
                  path: 'category/:categoryId/',
                  element: <ProductGrid />,
                },
                {
                  path: 'products/:productId/',
                  element: <ProductView />,
                  action: productViewAction
                },
              ]
            },
            {
              path: 'cart/',
              element: <Cart />,
              loader: cartLoader,
              action: cartAction,
            },
            {
              path: 'signIn/',
              element: <SignIn onSignIn={onSignIn} />,
              // action: signInAction,
            },
            {
              path: 'register/',
              element: <Register onRegister={onRegister} />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
