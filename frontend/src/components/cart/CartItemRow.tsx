import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { cartStore } from '../../store/cartStore';
import type { CartItem } from '../../types';

interface Props {
  item: CartItem;
}

const CartItemRow = observer(function CartItemRow({ item }: Props) {
  const { product, quantity } = item;
  const lineTotal = (product.price * quantity).toFixed(2);

  return (
    <div className="flex gap-4 items-center bg-white border border-gray-100 rounded-xl p-4">
      <img
        src={product.thumbnailUrl}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">${product.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          icon="pi pi-minus"
          rounded
          text
          size="small"
          className="w-8 h-8 text-gray-600 hover:bg-gray-100"
          onClick={() => cartStore.updateQuantity(product.id, quantity - 1)}
          aria-label={`Decrease quantity of ${product.name}`}
          disabled={quantity <= 1}
        />
        <span className="w-6 text-center font-semibold text-gray-800 text-sm">
          {quantity}
        </span>
        <Button
          icon="pi pi-plus"
          rounded
          text
          size="small"
          className="w-8 h-8 text-gray-600 hover:bg-gray-100"
          onClick={() => cartStore.updateQuantity(product.id, quantity + 1)}
          aria-label={`Increase quantity of ${product.name}`}
        />
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="font-bold text-indigo-600 text-base w-16 text-right">
          ${lineTotal}
        </span>
        <Button
          icon="pi pi-trash"
          rounded
          text
          size="small"
          severity="danger"
          className="w-8 h-8"
          onClick={() => cartStore.removeItem(product.id)}
          aria-label={`Remove ${product.name} from cart`}
        />
      </div>
    </div>
  );
});

export default CartItemRow;
