export default function ProductImage({ product, className = '' }) {
  return (
    <img
      src={product.image}
      alt={product.imageAlt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
