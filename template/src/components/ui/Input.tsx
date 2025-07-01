import { useId } from 'react';
import { cn } from '../../utils/cn';

interface Props {
	value: string;
	setValue: (v: string) => void;
	id?: string;
	className?: string;
}

export default function Input({ value, setValue, id, className }: Props) {
	const autoId = useId();
	return (
		<input
			id={id ?? autoId}
			type="text"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			className={cn(
				'h-6 w-full rounded-full bg-neutral-300 pl-2 text-sm outline-none selection:bg-black/15 dark:bg-neutral-700 dark:selection:bg-white/15',
				className,
			)}
		/>
	);
}
