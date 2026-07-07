import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { cartStore } from '../store/cartStore';
import CartItemRow from '../components/cart/CartItemRow';
import CartSummary from '../components/cart/CartSummary';

const CartPage = observer(function CartPage() {
  const isEmpty = cartStore.items.length === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <i className="pi pi-shopping-cart text-6xl text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/">
            <Button
              label="Browse Products"
              icon="pi pi-arrow-left"
              className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
            />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex flex-col gap-3 flex-1">
            <p className="text-sm text-gray-500 mb-1">
              {cartStore.itemCount} item{cartStore.itemCount !== 1 ? 's' : ''} in your cart
            </p>
            {cartStore.items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>

          <div className="w-full lg:w-80">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
});

export default CartPage;
