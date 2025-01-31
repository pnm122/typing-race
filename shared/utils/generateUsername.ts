const ADJECTIVES = [
	'Abnormal',
	'Adept',
	'Alarmed',
	'Amazing',
	'Average',
	'Basic',
	'Big',
	'Blind',
	'Brave',
	'Burly',
	'Complex',
	'Confused',
	'Cool',
	'Creative',
	'Creepy',
	'Dashing',
	'Deadly',
	'Decisive',
	'Deranged',
	'Discrete',
	'Eager',
	'Elegant',
	'Enormous',
	'Excited',
	'Funny',
	'Fake',
	'Fluid',
	'Fuzzy',
	'Giant',
	'Generous',
	'Golden',
	'Hairy',
	'Handsome',
	'Heavy',
	'Hollow',
	'Hopeful',
	'Ignorant',
	'Immense',
	'Itchy',
	'Jagged',
	'Jazzy',
	'Jumbo',
	'Kind',
	'Lame',
	'Lazy',
	'Little',
	'Liquid',
	'Lopsided',
	'Loving',
	'Loyal',
	'Massive',
	'Meager',
	'Mindless',
	'Muted',
	'Needy',
	'Nice',
	'Normal',
	'Obvious',
	'Orange',
	'Ornate',
	'Pale',
	'Periodic',
	'Pesky',
	'Pink',
	'Plump',
	'Polite',
	'Pungent',
	'Quick',
	'Quiet',
	'Quirky',
	'Reckless',
	'Regular',
	'Rich',
	'Rotten',
	'Scented',
	'Silent',
	'Smart',
	'Smelly',
	'Smooth',
	'Squeaky',
	'Subtle',
	'Super',
	'Swift',
	'Tedious',
	'Tiny',
	'Tricky',
	'Ugly',
	'Uncommon',
	'Unusual',
	'Upbeat',
	'Vibrant',
	'Violent',
	'Virtual',
	'Vivid',
	'Wealthy',
	'Wicked',
	'Wise',
	'Worried',
	'Young',
	'Zealous',
	'Zesty'
] as const

const NOUNS = [
	'Aardvark',
	'Alien',
	'Ant',
	'Badger',
	'Bird',
	'Bear',
	'Bee',
	'Buffalo',
	'Cactus',
	'Camel',
	'Cat',
	'Chair',
	'Cheetah',
	'Cicada',
	'Cow',
	'Coyote',
	'Deer',
	'Dog',
	'Donkey',
	'Dragon',
	'Eagle',
	'Eel',
	'Elk',
	'Emu',
	'Falcon',
	'Ferret',
	'Fish',
	'Fox',
	'Frog',
	'Fly',
	'Gazelle',
	'Gerbil',
	'Giraffe',
	'Goat',
	'Goose',
	'Gopher',
	'Gremlin',
	'Guppy',
	'Hamster',
	'Hawk',
	'Hedgehog',
	'Hippo',
	'Hornet',
	'Horse',
	'Ibex',
	'Insect',
	'Jackal',
	'Jaguar',
	'Kangaroo',
	'Koala',
	'Krill',
	'Ladybug',
	'Lemur',
	'Lion',
	'Lizard',
	'Llama',
	'Marmot',
	'Mole',
	'Moose',
	'Moth',
	'Mouse',
	'Muskrat',
	'Narwhal',
	'Nematode',
	'Newt',
	'Ocelot',
	'Octopus',
	'Orca',
	'Otter',
	'Owl',
	'Panda',
	'Parakeet',
	'Parrot',
	'Pelican',
	'Platypus',
	'Puffin',
	'Quail',
	'Quetzal',
	'Rabbit',
	'Raccoon',
	'Rat',
	'Reindeer',
	'Rooster',
	'Scorpion',
	'Seahorse',
	'Seal',
	'Shark',
	'Sheep',
	'Sloth',
	'Slug',
	'Snake',
	'Spider',
	'Sponge',
	'Squirrel',
	'Starfish',
	'Tiger',
	'Toucan',
	'Tuba',
	'Turkey',
	'Unicorn',
	'Vulture',
	'Walrus',
	'Wizard',
	'Whale',
	'Wolf',
	'Worm',
	'Yak',
	'Zebra'
] as const

export default function generateUsername(fullRandom = false) {
	if (fullRandom) {
		const chars = '_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return Array.from(Array(16), () => chars[Math.floor(Math.random() * chars.length)]).join('')
	}

	return `${ADJECTIVES[Math.round(Math.random() * (ADJECTIVES.length - 1))]}${NOUNS[Math.round(Math.random() * (NOUNS.length - 1))]}`
}
