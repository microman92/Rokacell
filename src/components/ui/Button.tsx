import Link from 'next/link';
import styles from './Button.module.scss';
import { cn } from '@/lib/utils';



interface BaseProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: never;
}

interface ActionButtonProps extends BaseProps {
  onClick: () => void;
  href?: never;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

/**
 * Универсальный компонент кнопки
 * - С href → рендерит как Link
 * - С onClick → рендерит как button
 */
export default function Button({
  children,
  variant,
  href,
  onClick,
}: ButtonProps) {
  const buttonClasses = cn(
    styles.button,
    styles[`${variant}`],
  );


  console.log(variant);
  
  // Если есть href — это ссылка
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  // Иначе — обычная кнопка
  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
