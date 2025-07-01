import { useId } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface Props {
	value: boolean;
	setValue: (v: boolean) => void;
	id?: string;
	className?: string;
}

export default function Switcher({ value, setValue, id, className }: Props) {
	const autoId = useId();
	return (
		<label
			htmlFor={id ?? autoId}
			className={cn(
				'relative flex h-6 w-full cursor-pointer justify-start overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700',
				value && 'justify-end',
				className,
			)}
		>
			<motion.div
				transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
				layout="position"
				className="flex h-full w-1/2 items-center justify-center rounded-full bg-neutral-700 dark:bg-neutral-300"
			/>
			<input
				type="checkbox"
				id={id ?? autoId}
				checked={value}
				onChange={(e) => setValue(e.target.checked)}
				className="hidden"
			/>
		</label>
	);
}
