import Image from 'next/image';

interface ArticleImageProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}

function ImagePlaceholder({ alt, className }: { alt: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-dark-100 rounded-xl ${className || ''}`}>
      <div className="text-center p-6">
        <svg className="mx-auto h-12 w-12 text-dark-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-dark-400">{alt || 'Imagen pendiente'}</p>
      </div>
    </div>
  );
}

export function ArticleImage({
  src,
  alt,
  width = 800,
  height = 450,
  caption,
  priority = false,
  className = '',
}: ArticleImageProps) {
  if (!src) {
    return <ImagePlaceholder alt={alt} className={className} />;
  }

  return (
    <figure className={`my-6 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="rounded-xl object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-dark-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface FeaturedImageProps {
  src: string | null;
  alt: string;
  title: string;
}

export function FeaturedImage({ src, alt, title }: FeaturedImageProps) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl">
      <ArticleImage
        src={src}
        alt={alt || title}
        width={1200}
        height={630}
        priority
        className="aspect-[1200/630]"
      />
    </div>
  );
}
