import Link from 'next/link';
import styles from './Button.module.scss';
import { cn } from '@/lib/utils';


interface BaseProps {
  children: React.ReactNode;
  variant?: string; 
  className?: string;
  disabled?: boolean;
}


interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
}


interface ActionButtonProps extends BaseProps {
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  type?: "button" | "submit" | "reset"; 
}

type ButtonProps = LinkButtonProps | ActionButtonProps;


export default function Button({
  children,
  variant,
  href,
  className,
  ...props
}: ButtonProps) {

  
  const buttonClasses = cn(
    styles.button,
    variant && styles[variant],
    className
  );

  
  if (typeof href === 'string') {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  
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


