import { type ComponentProps, useMemo } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

export default function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	id,
	...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	);

	return (
		<SliderPrimitive.Root
			id={id}
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			orientation="horizontal"
			className={cn(
				'relative flex h-6 w-full touch-none items-center select-none',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-700" />
			{Array.from({ length: _values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					key={index}
					className="block h-6 w-12 shrink-0 cursor-col-resize rounded-full bg-neutral-700 outline-none dark:bg-neutral-300"
				/>
			))}
		</SliderPrimitive.Root>
	);
}
