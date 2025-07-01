<h1 align="center">
  shq lab
</h1>

<h4 align="center">The minimal laboratory template</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a>
</p>

https://github.com/user-attachments/assets/5255164a-2e40-4cb6-bbfd-ab72e33437d1

## Key Features

- Using [nanostores](https://github.com/nanostores/nanostores) for convenient configuration
- Automatic generation of configuration parameters
  - Just create the atoms in the configuration file
  - 3 types of configuration values: slider/switcher/input
- Pre-installed and configured [Tailwind](https://tailwindcss.com/) + [Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- Dark/Light mode

## How To Use

Creation of a new laboratory:

```bash
# npm
$ npm create shqlab@latest

# bun
$ bun create shqlab
```

Creating configuration values in config.ts:
```ts
// src/config.ts
export const $show = atom<boolean>(true);
export const $scale = atom<number>(1);
export const $text = atom<string>('text');

const config: ConfigItem[] = [
	{ id: 'showCube', name: 'Show Cube', type: 'switch', value: $show },
	{ id: 'sizeCube', name: 'Size', type: 'slider', value: $scale, min: 1, max: 5, step: 0.5 },
	{ id: 'text', name: 'Text', type: 'text', value: $text }
];
```
And usage this values in your example/test:
```tsx
// src/App.tsx
export default function App() {
  const show = useStore($show);
  const scale = useStore($scale);
  const text = useStore($text);

  return (
    <main className="relative flex h-full w-full items-center justify-center">
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            key="cube"
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            initial={{ transform: 'scale(0)' }}
            animate={{ transform: `scale(${scale})` }}
            exit={{ transform: 'scale(0)' }}
            className="flex size-45 items-center justify-center rounded-4xl bg-amber-600"
          >
            <span className="text-2xl text-neutral-900">{text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
```

## Credits

This lab uses the following packages:

- [tailwind](https://tailwindcss.com/)
- [prettier](https://prettier.io/)
- [nanostores](https://github.com/nanostores/nanostores)
- [motion](https://motion.dev/)
- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)

> Inspired the creation of [@jh3yy](https://x.com/jh3yy)
