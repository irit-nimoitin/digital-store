import { useState } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';

const CartSummary = observer(function CartSummary() {
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    setCheckedOut(true);
    cartStore.clearCart();
  };

  if (checkedOut) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <i className="pi pi-check text-3xl text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Order Placed!</h2>
        <p className="text-gray-500 text-sm">
          Thank you for your purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 sticky top-20">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="flex flex-col gap-2">
        {cartStore.items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm text-gray-600">
            <span className="truncate flex-1 mr-2">
              {item.product.name}
              <span className="text-gray-400"> ×{item.quantity}</span>
            </span>
            <span className="flex-shrink-0 font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Divider className="my-0" />

      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-900 text-base">Total</span>
        <span className="font-bold text-indigo-600 text-2xl">
          ${cartStore.total.toFixed(2)}
        </span>
      </div>

      <Button
        label="Proceed to Checkout"
        icon="pi pi-credit-card"
        className="w-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
        onClick={handleCheckout}
      />

      <Button
        label="Clear Cart"
        icon="pi pi-trash"
        severity="secondary"
        outlined
        className="w-full"
        onClick={() => cartStore.clearCart()}
      />
    </div>
  );
});

export default CartSummary;
