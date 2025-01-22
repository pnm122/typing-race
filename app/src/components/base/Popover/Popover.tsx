'use client'

import createClasses from '@/utils/createClasses'
import styles from './style.module.scss'
import { useEffect } from 'react'

type Props = React.PropsWithChildren<{
	/**
	 * Whether the popup has a backdrop covering the content behind.
	 * @default true
	 **/
	hasBackdrop?: boolean
	/** Callback for clicking the backdrop. */
	onBackdropClicked?: () => void
	/** Class(es) to add to the popover. */
	className?: string
	/**
	 * Whether the body should be scrollable when the popover is open.
	 * @default false
	 */
	bodyScrollableWhenOpen?: boolean
	/** Whether the popover is open. */
	open: boolean
	/** Element to focus when the popover opens. */
	focusOnOpenRef?: React.RefObject<HTMLElement>
}>

export default function Popover({
	hasBackdrop = true,
	onBackdropClicked,
	className,
	bodyScrollableWhenOpen = false,
	open,
	focusOnOpenRef,
	children
}: Props) {
	useEffect(() => {
		if (open) {
			// Need a small delay presumably because the element is technically not visible yet
			setTimeout(() => focusOnOpenRef?.current?.focus(), 25)
		}
	}, [open])

	return (
		<div
			className={createClasses({
				[styles['popover']]: true,
				[styles['popover--open']]: open,
				[styles['popover--no-scroll']]: !bodyScrollableWhenOpen
			})}
		>
			{hasBackdrop && (
				<button
					className={styles['popover__backdrop']}
					onClick={() => onBackdropClicked && onBackdropClicked()}
				/>
			)}
			<div
				className={createClasses({
					[styles['popover__content']]: true,
					...(className ? { [className]: true } : {})
				})}
			>
				{children}
			</div>
		</div>
	)
}
