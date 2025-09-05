export const settings = $state({
  darkMode: localStorage.getItem('theme') === 'dark',
  grid: localStorage.getItem('grid') === 'true'
});
