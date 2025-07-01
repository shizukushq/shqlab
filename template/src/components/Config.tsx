import Switcher from './ui/Switcher';
import Slider from './ui/Slider';
import Input from './ui/Input';
import Icon from './ui/Icon';
import { useLayoutEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '@nanostores/react';
import { motion, useWillChange } from 'motion/react';
import { cn } from '../utils/cn';
import config, { type ConfigItem } from '../config';

export default function Config() {
	const [isDark, setDark] = useTheme();
	const [showGrid, setShowGrid] = useState(true);

	useLayoutEffect(() => {
		if (showGrid) document.documentElement.classList.add('bg-grid');
		else document.documentElement.classList.remove('bg-grid');
	}, [showGrid]);

	const [showSettings, setShowSettings] = useState(true);
	const [showConfig, setShowConfig] = useState(true);
	const willChange = useWillChange();

	return (
		<div className="fixed top-4 right-4 z-100 w-80 overflow-hidden rounded-2xl bg-neutral-200 outline outline-neutral-300 dark:bg-neutral-800 dark:outline-neutral-700">
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
			<motion.div
				transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
				animate={{
					height: showConfig ? 'auto' : 0,
					opacity: showConfig ? 100 : 0,
				}}
				style={{ willChange, pointerEvents: showConfig ? 'auto' : 'none' }}
				className="overflow-hidden"
			>
				<div className="flex w-full flex-col gap-4 px-3 py-4">
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
			</motion.div>
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
			<motion.div
				transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
				animate={{
					height: showSettings ? 'auto' : 0,
					opacity: showSettings ? 100 : 0,
				}}
				style={{ willChange, pointerEvents: showConfig ? 'auto' : 'none' }}
				className="overflow-hidden"
			>
				<div className="flex w-full flex-col gap-4 px-3 py-4">
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
			</motion.div>
		</div>
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
