'use client'

import { useTransition } from 'react'
import CategoryFilter from '@/components/page/profile/Filter/CategoryFilter'
import styles from './style.module.scss'
import createClasses from '@/utils/createClasses'
import NumWordsFilter from '@/components/page/profile/Filter/NumWordsFilter'
import IndeterminateProgress from '@/components/base/IndeterminateProgress/IndeterminateProgress'
import { userStatsDisplayNames } from '@/utils/displayNameMappings'

export default function StatsContentClient() {
	const [isPending, startTransition] = useTransition()

	// TODO: get data from db
	const stats = {
		maxWPM: 107,
		wordsTyped: 1843,
		racesPlayed: 55,
		racesWon: 21
	}

	return (
		<div className={styles['stats']}>
			<h2 className={styles['stats__heading']}>Your stats</h2>
			<div className={styles['stats__filters']}>
				<CategoryFilter paramKey="stats-category" transition={[isPending, startTransition]} />
				<NumWordsFilter
					minWordsParamKey="stats-min-words"
					maxWordsParamKey="stats-max-words"
					transition={[isPending, startTransition]}
				/>
			</div>
			<div className={styles['stat-boxes']}>
				{Object.keys(stats).map((key) => (
					<div
						key={key}
						className={createClasses({
							[styles['stat-box']]: true,
							[styles['stat-box--pending']]: isPending
						})}
					>
						{isPending && <IndeterminateProgress />}
						<h3 className={styles['stat-box__stat']}>
							{stats[key as keyof typeof stats]}
							{key === 'maxWPM' ? 'wpm' : ''}
						</h3>
						<h4 className={styles['stat-box__name']}>
							{userStatsDisplayNames[key as keyof typeof userStatsDisplayNames]}
						</h4>
					</div>
				))}
			</div>
		</div>
	)
}