export const settings = $state({
  darkMode: localStorage.getItem('theme') === 'dark',
  grid: localStorage.getItem('grid') === 'true'
});

$effect.root(() => {
  $effect.pre(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    if (settings.grid) {
      document.documentElement.classList.add('bg-grid');
      localStorage.setItem('grid', 'true');
    } else {
      document.documentElement.classList.remove('bg-grid');
      localStorage.setItem('grid', 'false');
    }
  });
  return () => {};
});
