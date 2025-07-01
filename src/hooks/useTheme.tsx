import { useState, useLayoutEffect } from 'react';

export function useTheme() {
	const [isDark, setDark] = useState(localStorage.getItem('theme') === 'dark');
	useLayoutEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	return [isDark, setDark] as const;
}
