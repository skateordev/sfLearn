import Link from 'next/link';
import { NavStyled } from './styles';
import useUser from './User/User';
import SignOut from './SignOut/SignOut';
import { useCart } from '../lib/cartState';
import { Splat } from './Splat';

export default function Nav() {
  const user = useUser();
  const currentCart = useCart();

  const { openCart } = currentCart;

  const totalCartItems = user?.cart?.reduce((tally, cartItem) => {
    const quantity = cartItem.product ? cartItem.quantity : 0;

    return tally + quantity;
  }, 0);

  return (
    <NavStyled>
      {user && (
        <button type="button" onClick={openCart} className="cart">
          Cart
          <Splat count={totalCartItems} />
        </button>
      )}
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && <Link href="/signin">Sing In 🎤</Link>}
    </NavStyled>
  );
}
