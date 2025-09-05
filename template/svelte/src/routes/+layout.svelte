<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { settings } from '$lib/store.svelte';

  let { children } = $props();

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
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>shq-lab</title>
</svelte:head>

{@render children?.()}
