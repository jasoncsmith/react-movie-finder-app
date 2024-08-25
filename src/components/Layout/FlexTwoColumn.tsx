import { ReactNode } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type LayoutOptions = '50/50' | '60/40' | '70/30' | '80/20'

interface FlexTwoColumnProps {
  children: ReactNode
  options?: LayoutOptions
  className?: string
}

export default function FlexTwoColumn({ children, options = '50/50', className = '' }: FlexTwoColumnProps) {
  return (
    <div
      className={cn({
        'flex gap-8 items-center justify-between flex-col md:flex-row': true,
        [styles['flexTwoColumn--5050']]: options === '50/50',
        [styles['flexTwoColumn--6040']]: options === '60/40',
        [styles['flexTwoColumn--7030']]: options === '70/30',
        [styles['flexTwoColumn--8020']]: options === '80/20',
        [className]: !!className,
      })}
    >
      {children}
    </div>
  )
}
