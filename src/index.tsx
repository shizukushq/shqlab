import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Sprite from './components/Sprite.tsx';
import App from './App.tsx';
import Config from './components/Config.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Sprite />
		<App />
		<Config />
		<div className="fixed bottom-0 z-100 flex w-full items-center justify-center py-3 text-xs">
			<span className="text-neutral-500 dark:text-neutral-400">
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
		</div>
		<span className="fixed top-4 left-4 font-medium">shq lab</span>
	</StrictMode>,
);
