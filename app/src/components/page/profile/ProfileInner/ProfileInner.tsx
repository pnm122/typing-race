'use client'

import { User } from '@prisma/client'
import styles from './style.module.scss'
import IconButton from '@/components/base/Button/IconButton'
import PixelarticonsEdit from '~icons/pixelarticons/edit'
import SettingsPopover from '@/components/page/profile/SettingsPopover/SettingsPopover'
import { useState } from 'react'
import { ProfileContext, useProfile } from '@/context/Profile'
import LevelAndPoints from '@/components/page/profile/LevelAndPoints/LevelAndPoints'
import { CursorColor } from '$shared/types/Cursor'
import UserAndCursor from '@/components/shared/UserAndCursor/UserAndCursor'

interface Props {
	user: User
	stats: React.ReactNode
	races: React.ReactNode
}

export default function ProfileInner({ user, ...serverComponents }: Props) {
	// Can't put context in a server component so it has to go here :(
	return (
		<ProfileContext.Provider value={{ user }}>
			<Profile {...serverComponents} />
		</ProfileContext.Provider>
	)
}

function Profile({ stats, races }: Omit<Props, 'user'>) {
	const [settingsOpen, setSettingsOpen] = useState(false)
	const { user } = useProfile()

	return (
		<>
			<main className={styles['page']}>
				<section className={styles['page__top']}>
					<div className={styles['user']}>
						<div className={styles['user__preview-and-edit']}>
							<UserAndCursor
								size="large"
								username={user.username}
								color={user.cursorColor as CursorColor}
							/>
							<IconButton
								style="tertiary"
								icon={<PixelarticonsEdit />}
								aria-label="Edit username and color"
								className={styles['edit']}
								onClick={() => setSettingsOpen(true)}
							/>
						</div>
						<LevelAndPoints />
					</div>
					{stats}
				</section>
				{races}
			</main>
			<SettingsPopover
				user={user}
				open={settingsOpen}
				onClose={() => setSettingsOpen(false)}
				points={user.points}
			/>
		</>
	)
}
