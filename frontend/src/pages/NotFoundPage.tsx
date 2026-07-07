import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <i className="pi pi-exclamation-circle text-6xl text-indigo-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button label="Back to Products" icon="pi pi-arrow-left" className="bg-indigo-600 border-indigo-600" />
      </Link>
    </div>
  );
}
