'use client'

import styles from './style.module.scss'
import Button from '@/components/base/Button/Button'
import IconButton from '@/components/base/Button/IconButton'
import { useEffect, useRef, useState } from 'react'
import PixelarticonsUser from '~icons/pixelarticons/user'
import { signOutAction } from '@/actions/auth'
import { Session } from 'next-auth'
import ThemeSwitcher from '@/components/shared/ThemeSwitcher/ThemeSwitcher'
import Dropdown from '@/components/base/Dropdown/Dropdown'
import PixelarticonsLogout from '~icons/pixelarticons/logout'
import PixelarticonsLogin from '~icons/pixelarticons/login'
import { usePathname } from 'next/navigation'
import ButtonIcon from '@/components/base/Button/ButtonIcon'
import { User } from '@prisma/client'

interface Props {
	session: Session | null
	user: User | null
}

export default function Account({ session, user }: Props) {
	const path = usePathname()
	const [expanded, setExpanded] = useState(false)
	const firstButton = useRef<HTMLButtonElement>(null)
	const toggleButton = useRef<HTMLElement>(null)

	useEffect(() => {
		setExpanded(false)
	}, [path])

	function toggleExpanded() {
		setExpanded(!expanded)
	}

	return (
		<div className={styles['account']}>
			{session?.user && user ? (
				<Button
					className={styles['account__user']}
					style="tertiary"
					onClick={toggleExpanded}
					ref={toggleButton}
				>
					{user.username}
				</Button>
			) : (
				<IconButton
					style="tertiary"
					icon={<PixelarticonsUser />}
					aria-label="Open profile"
					aria-expanded={expanded}
					aria-controls="account-dropdown"
					onClick={toggleExpanded}
					ref={toggleButton}
				/>
			)}
			<Dropdown
				open={expanded}
				id="account-dropdown"
				toggleButton={toggleButton}
				focusOnOpenRef={firstButton}
				onClose={() => setExpanded(false)}
				className={styles['account__dropdown']}
			>
				<div className={styles['links']}>
					{session?.user ? (
						<>
							<Button
								ref={firstButton}
								style="tertiary"
								href="/profile"
								className={styles['links__link']}
							>
								<ButtonIcon icon={<PixelarticonsUser />} />
								Profile
							</Button>
							<Button
								style="tertiary"
								onClick={() => signOutAction()}
								className={styles['links__link']}
							>
								<ButtonIcon icon={<PixelarticonsLogout />} />
								Logout
							</Button>
						</>
					) : (
						<Button ref={firstButton} href="/login">
							<ButtonIcon icon={<PixelarticonsLogin />} />
							Login
						</Button>
					)}
				</div>
				<hr></hr>
				<ThemeSwitcher />
			</Dropdown>
		</div>
	)
}