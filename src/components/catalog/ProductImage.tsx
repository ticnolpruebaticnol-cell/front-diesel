import React, { useState } from 'react';

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'jfif', 'webp'];

interface ProductImageProps {
  codigos: string[];
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProductImage: React.FC<ProductImageProps> = ({ codigos, alt, className = '', style }) => {
  const [codigoIdx, setCodigoIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [error, setError] = useState(false);

  if (!codigos || codigos.length === 0) {
    return <div className="flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl h-40 w-full text-xs font-bold uppercase">Sin imagen</div>;
  }

  const src = `/productos/${codigos[codigoIdx]}.${EXTENSIONS[imgIdx]}`;

  const handleError = () => {
    if (imgIdx < EXTENSIONS.length - 1) {
      setImgIdx(idx => idx + 1);
    } else if (codigoIdx < codigos.length - 1) {
      setCodigoIdx(idx => idx + 1);
      setImgIdx(0);
    } else {
      setError(true);
    }
  };

  if (error) {
    return <div className="flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl h-40 w-full text-xs font-bold uppercase">Sin imagen</div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className + ' object-contain rounded-2xl bg-gray-50 h-40 w-full mb-4'}
      style={style}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ProductImage;
