import { PropsWithChildren } from "react"
import clsx from "clsx"

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={clsx("container", className)}>
      {children}
    </div>
  )
}
