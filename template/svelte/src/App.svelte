<script lang="ts">
  import { Pane, Checkbox, Folder } from 'svelte-tweakpane-ui';
  import { settings } from '$lib/store.svelte';
  import { fly } from 'svelte/transition';
  import { eases } from 'animejs';

  let showCube = $state(true);
</script>

<Pane title="Settings" position="fixed">
  <Checkbox bind:value={settings.darkMode} label="Dark mode:" />
  <Checkbox bind:value={settings.grid} label="Grid:" />
  <Folder title="Cube">
    <Checkbox bind:value={showCube} label="Show:" />
  </Folder>
</Pane>

<div class="relative flex h-full w-full items-center justify-center">
  {#if showCube}
    <span
      transition:fly={{
        duration: 500,
        easing: eases.outElastic(0.8, 0.8),
        y: window.screen.height / 2 + 100,
        opacity: 1
      }}
      class="flex size-32 items-center justify-center rounded-2xl bg-amber-500 text-neutral-950"
    >
      shq
    </span>
  {/if}
</div>
