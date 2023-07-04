import { Outlet } from "react-router-dom";

import Banner from '../components/Banner';
import Footer from '../components/Footer';

import { getCategories, getUsers, getLogin, getProducts } from "../api";

export async function loader() {
  const products = await getProducts();
  const categories = await getCategories();
  const users = getUsers();
  const login = getLogin();

  return { products, categories, users, login };
}

const Root = ({ onSignOut, isSignedIn, user, cart }) => {
  return (
    <>
      <Banner onSignOut={onSignOut} isSignedIn={isSignedIn} user={user} cart={cart} />
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
