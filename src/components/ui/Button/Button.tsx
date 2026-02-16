import Link from 'next/link';
import styles from './Button.module.scss';
import { cn } from '@/lib/utils';

// Common props for both Link and Button
interface BaseProps {
  children: React.ReactNode;
  variant?: string; // e.g., 'primary', 'secondary', 'outline'
  className?: string;
  disabled?: boolean;
}

// Props specific to Link usage
interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

// Props specific to Button usage
interface ActionButtonProps extends BaseProps {
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional onClick
  type?: "button" | "submit" | "reset"; // Standard button types
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

/**
 * Universal Button Component
 * - Renders as <Link> if 'href' is provided.
 * - Renders as <button> otherwise.
 * - Supports variants via CSS modules composed with 'cn'.
 */
export default function Button({
  children,
  variant,
  href,
  className,
  ...props
}: ButtonProps) {

  // Compose classes: base .button + variant class + custom className
  const buttonClasses = cn(
    styles.button,
    variant && styles[variant],
    className
  );

  // 1. Render as Link if href is present (and is a string)
  if (typeof href === 'string') {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  // 2. Render as Button
  const { onClick, type = "button", disabled } = props as ActionButtonProps;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}


