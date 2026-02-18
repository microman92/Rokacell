import clsx from 'clsx';
import { JSX, ReactNode } from 'react';
import styles from './Heading.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  tag?: HeadingTag;
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'black';
}
export const Heading = ({ tag = 'h2', children, className, variant = "white" }: HeadingProps) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={clsx(styles.heading, styles[`heading--${tag}`], styles[`heading--${variant}`], className)}>
      {children}
    </Tag>
  );
};

export default Heading;
