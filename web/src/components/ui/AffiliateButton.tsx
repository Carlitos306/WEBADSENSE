import { ExternalLink } from 'lucide-react';

interface AffiliateButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function AffiliateButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  showIcon = true,
  className = '',
}: AffiliateButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2';

  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-dark-900 text-white hover:bg-dark-800',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {showIcon && <ExternalLink className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />}
    </a>
  );
}
