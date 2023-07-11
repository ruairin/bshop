import React from "react";
import { useRouteLoaderData, useLoaderData, redirect, Form } from "react-router-dom";
import './Cart.css';

export async function loader() {

  try {
    const response = await fetch('http://localhost:3000/getCartItems', {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const cartItems = await response.json();
      if (cartItems) {
        return cartItems;
      }
    } else if (response.status === 401) {
      return redirect('/signIn/');
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log("Error getting cart items: ", error);
  }
  return [];
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    const response = await fetch('http://localhost:3000/deleteCartItem', {
      method: 'delete',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: data.id,
      })
    });

    if (response.ok) {
      const deletedItem = await response.json();
      if (deletedItem) {
        console.log(deletedItem);
        return deletedItem;
      }
    } else if (response.status === 401) {
      return redirect('/signIn/');
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.log("Error deleting cart items: ", error);
  }
  return null;
}

const Cart = () => {

  const { products } = useRouteLoaderData('root');
  const cartItems = useLoaderData();

  return (
    <>
      <div className="px-2 sm:px-20 py-10">
        <div className="" style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
          <h2 className='page-title-font'>Cart</h2>

          <div className="pt-5 pb-10">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.</p>
          </div>
          <table className='py-10 px-10' cellSpacing='0'>
            <thead>
              <tr>
                <th className="font-bold border-b b--black-20 pb-3 text-left">Title</th>
                <th className="font-bold border-b b--black-20 pb-3 text-left hidden sm:block">Image</th>
                <th className="font-bold border-b b--black-20 pb-3 text-left">Qty.</th>
                <th className="font-bold border-b b--black-20 pb-3 text-left">Price</th>
                <th className="font-bold border-b b--black-20 pb-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                cartItems.length > 0
                  ?
                  cartItems.map((item) => {
                    // get product details for item.id
                    const product = products[item.product_id - 1];
                    const { title, price, image_name } = product;
                    return (
                      <>
                        <tr>
                          <td className='border-b b--black-20 py-3 text-left'>{title}</td>
                          <td className='border-b b--black-20 py-3 text-left hidden sm:block'><img alt='productImage' src={`/images/${image_name}`} width={50} /></td>
                          <td className='border-b b--black-20 py-3 text-left'>{item.qty}</td>
                          <td className='border-b b--black-20 py-3 text-left'>{price}</td>
                          <td className='border-b b--black-20 py-3 text-left link cursor-pointer underline'
                          // onClick={() => onDeleteFromCart(item.id)}
                          >
                            <Form method='delete' id='delete-item'>
                              <button type='submit' value={item.id} name='id'>Delete</button>
                            </Form>
                          </td>

                        </tr>
                      </>
                    );
                  })
                  :
                  <tr>
                    <td className='font-bold border-b b--black-20 pb-3 text-center pt-6 pb-6' colSpan={5}> Cart is currently empty </td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Cart;