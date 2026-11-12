import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'light' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  external?: boolean;
};

/** The page's pill button: label plus a dot that grows into an arrow on hover. */
export default function PillLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
}: Props) {
  return (
    <a
      href={href}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <span className="btn-dot" aria-hidden>
        <ArrowRight strokeWidth={2.5} />
      </span>
    </a>
  );
}
