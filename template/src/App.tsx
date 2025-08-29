import { useTheme } from './hooks/useTheme';
import { useLayoutEffect } from 'react';
import { Pane } from 'tweakpane';

export default function App() {
	const [isDark, setDark] = useTheme();

	useLayoutEffect(() => {
		const params = { dark: isDark, grid: true };
		const pane = new Pane({ title: 'Settings' });
		pane
			.addBinding(params, 'dark', { label: 'Dark mode:' })
			.on('change', (e) => setDark(e.value));
		pane
			.addBinding(params, 'grid', { label: 'Grid:' })
			.on('change', (e) =>
				e.value
					? document.documentElement.classList.add('bg-grid')
					: document.documentElement.classList.remove('bg-grid'),
			);

		// PARAMS
		const f = pane.addFolder({
			title: 'Params',
			expanded: true,
		});

		return () => pane.dispose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="relative flex h-full w-full items-center justify-center">
			{/**/}
		</div>
	);
}
