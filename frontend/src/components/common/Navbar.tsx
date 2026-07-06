import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { cartStore } from '../../store/cartStore';
import { Badge } from 'primereact/badge';

const Navbar = observer(function Navbar() {
  const itemCount = cartStore.itemCount;
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <i className="pi pi-shopping-bag text-2xl" />
            <span>DigitalStore</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className={`text-sm transition-colors ${isActive('/')}`}>
              Products
            </Link>
            <Link
              to="/cart"
              className={`relative flex items-center gap-1 text-sm transition-colors ${isActive('/cart')}`}
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <i className="pi pi-shopping-cart text-xl" />
              {itemCount > 0 && (
                <Badge value={itemCount} severity="danger" className="absolute -top-2 -right-3" />
              )}
              <span className="ml-2">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
