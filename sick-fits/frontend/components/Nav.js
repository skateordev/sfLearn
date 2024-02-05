import Link from 'next/link';
import { NavStyled } from './styles';

export default function Nav() {
  return (
    <NavStyled>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </NavStyled>
  );
}
