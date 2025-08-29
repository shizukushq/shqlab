import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.body).render(
	<StrictMode>
		<App />
		<span className="pointer-events-none fixed bottom-3 left-1/2 -translate-x-1/2 text-xs text-neutral-500 dark:text-neutral-400">
			Made by{' '}
			<a
				href="https://github.com/shizukushq"
				target="_blank"
				draggable="false"
				className="text-neutral-900 dark:text-neutral-100"
			>
				shizuku
			</a>
		</span>
		<span className="pointer-events-none fixed top-4 left-4 font-medium">
			shq-lab
		</span>
	</StrictMode>,
);
