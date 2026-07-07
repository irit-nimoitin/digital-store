import { useState } from 'react';
import { Button } from 'primereact/button';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

const AddToCartButton = observer(function AddToCartButton({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    cartStore.addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      label={added ? 'Added to Cart!' : 'Add to Cart'}
      icon={added ? 'pi pi-check' : 'pi pi-shopping-cart'}
      onClick={handleClick}
      disabled={added}
      className={`w-full sm:w-auto transition-all ${
        added
          ? 'p-button-success'
          : 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600'
      }`}
      aria-label={`Add ${product.name} to cart`}
    />
  );
});

export default AddToCartButton;
