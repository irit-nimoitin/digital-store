interface Props {
  rating: number;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: Props) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <i
          key={i}
          className={`pi pi-star${i < rating ? '-fill' : ''} text-sm ${
            i < rating ? 'text-amber-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
