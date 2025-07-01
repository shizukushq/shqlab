import Switcher from './ui/Switcher';
import Slider from './ui/Slider';
import Input from './ui/Input';
import Icon from './ui/Icon';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '@nanostores/react';
import {
	type PanInfo,
	animate,
	motion,
	useDragControls,
	useMotionValue,
} from 'motion/react';
import { cn } from '../utils/cn';
import config, { type ConfigItem } from '../config';

export default function Config() {
	const configWindow = useRef<HTMLDivElement>(null);

	const [isDark, setDark] = useTheme();
	const [showGrid, setShowGrid] = useState(true);

	useLayoutEffect(() => {
		if (showGrid) document.documentElement.classList.add('bg-grid');
		else document.documentElement.classList.remove('bg-grid');
	}, [showGrid]);

	const [showSettings, setShowSettings] = useState(true);
	const [showConfig, setShowConfig] = useState(true);

	const x = useMotionValue(window.innerWidth - 320 - 16);
	const y = useMotionValue(16);

	const controls = useDragControls();

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) => {
		const PADDING = 16;

		let finalX = 0;
		let finalY = 0;

		const isRightSide = info.point.x >= window.innerWidth / 2;
		const isBottomHalf = info.point.y >= window.innerHeight / 2;

		if (isRightSide) {
			finalX = window.innerWidth - 320 - PADDING;

			if (isBottomHalf) {
				finalY =
					window.innerHeight - configWindow.current!.clientHeight - PADDING;
			} else {
				finalY = PADDING;
			}
		} else {
			finalX = PADDING;
			finalY =
				window.innerHeight - configWindow.current!.clientHeight - PADDING;
		}

		animate(x, finalX, { type: 'spring', duration: 0.4 });
		animate(y, finalY, { type: 'spring', duration: 0.4 });
	};

	return (
		<motion.div
			ref={configWindow}
			drag
			dragControls={controls}
			dragListener={false}
			onDragEnd={handleDragEnd}
			style={{ x, y }}
			className="fixed top-0 left-0 z-100 w-80 overflow-hidden rounded-2xl bg-neutral-200 outline outline-neutral-300 dark:bg-neutral-800 dark:outline-neutral-700"
		>
			<div
				onPointerDown={(e) => controls.start(e)}
				className="group flex h-5 w-full cursor-grab items-center justify-center bg-neutral-100 active:cursor-grabbing dark:bg-neutral-900"
			>
				<span className="h-1 w-28 rounded-full bg-neutral-300 group-active:bg-neutral-700 dark:bg-neutral-700 dark:group-active:bg-neutral-300" />
			</div>
			<div
				onClick={() => setShowConfig((v) => !v)}
				className="relative w-full bg-neutral-300 py-1 text-center font-medium dark:bg-neutral-700"
			>
				Config
				<Icon
					id="arrows"
					className={cn(
						'transition-transform duration-300 ease-out',
						'absolute top-1/2 right-2 size-4 -translate-y-1/2 -rotate-90',
						showConfig && 'rotate-0',
					)}
				/>
			</div>
			{config.length > 0 && (
				<div
					className={cn(
						'grid transition-[grid-template-rows] duration-250 ease-out',
						showConfig ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
					)}
				>
					<div className="overflow-hidden">
						<div
							className={cn(
								'flex min-h-0 w-full flex-col gap-4 px-3 py-4 transition-opacity duration-250 ease-out',
								!showConfig && 'pointer-events-none opacity-0',
							)}
						>
							{config.map((item) => {
								switch (item.type) {
									case 'switch':
										return <ConfigSwitch key={item.name} item={item} />;
									case 'slider':
										return <ConfigSlider key={item.name} item={item} />;
									case 'text':
										return <ConfigText key={item.name} item={item} />;
								}
							})}
						</div>
					</div>
				</div>
			)}
			<div className="h-px w-full bg-black/15 dark:bg-white/15"></div>
			<div
				onClick={() => setShowSettings((v) => !v)}
				className="relative w-full bg-neutral-300 py-1 text-center font-medium dark:bg-neutral-700"
			>
				Settings
				<Icon
					id="arrows"
					className={cn(
						'transition-transform duration-300 ease-out',
						'absolute top-1/2 right-2 size-4 -translate-y-1/2 -rotate-90',
						showSettings && 'rotate-0',
					)}
				/>
			</div>
			<div
				className={cn(
					'grid transition-[grid-template-rows] duration-250 ease-out',
					showSettings ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
				)}
			>
				<div className="overflow-hidden">
					<div
						className={cn(
							'flex min-h-0 w-full flex-col gap-4 px-3 py-4 transition-opacity duration-250 ease-out',
							!showSettings && 'pointer-events-none opacity-0',
						)}
					>
						<div className="flex w-full items-center justify-between gap-2">
							<label htmlFor="darkMode">Dark Mode:</label>
							<div className="w-3/5">
								<Switcher id="darkMode" value={isDark} setValue={setDark} />
							</div>
						</div>
						<div className="flex w-full items-center justify-between gap-2">
							<label htmlFor="grid">Grid:</label>
							<div className="w-3/5">
								<Switcher id="grid" value={showGrid} setValue={setShowGrid} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ConfigSwitch({
	item,
}: {
	item: Extract<ConfigItem, { type: 'switch' }>;
}) {
	const value = useStore(item.value);
	return (
		<div
			key={item.name}
			className="flex w-full items-center justify-between gap-2"
		>
			<label htmlFor={item.id}>{item.name}:</label>
			<div className="w-3/5">
				<Switcher
					id={item.id}
					value={value}
					setValue={(v) => item.value.set(v)}
				/>
			</div>
		</div>
	);
}

function ConfigSlider({
	item,
}: {
	item: Extract<ConfigItem, { type: 'slider' }>;
}) {
	const value = useStore(item.value);
	return (
		<div
			key={item.name}
			className="flex w-full items-center justify-between gap-2"
		>
			<label htmlFor={item.id}>{item.name}:</label>
			<div className="w-3/5">
				<Slider
					id={item.id}
					value={[value]}
					min={item.min}
					max={item.max}
					step={item.step}
					onValueChange={(v) => item.value.set(v[0])}
				/>
			</div>
		</div>
	);
}

function ConfigText({ item }: { item: Extract<ConfigItem, { type: 'text' }> }) {
	const value = useStore(item.value);
	return (
		<div
			key={item.name}
			className="flex w-full items-center justify-between gap-2"
		>
			<label htmlFor={item.id}>{item.name}:</label>
			<div className="w-3/5">
				<Input id={item.id} value={value} setValue={(v) => item.value.set(v)} />
			</div>
		</div>
	);
}
