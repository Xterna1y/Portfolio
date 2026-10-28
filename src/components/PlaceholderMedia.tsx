import { Image as ImageIcon } from 'lucide-react';

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  label?: string;
};

export default function PlaceholderMedia({
  src,
  alt = '',
  className = '',
  label = 'Image placeholder',
}: Props) {
  if (src?.trim()) {
    return (
      <img
        className={`media-image ${className}`}
        src={src}
        alt={alt}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`media-placeholder ${className}`}
      role="img"
      aria-label={label}
    >
      <ImageIcon
        aria-hidden="true"
        size={46}
        strokeWidth={1.25}
      />
      <span>{label}</span>
    </div>
  );
}