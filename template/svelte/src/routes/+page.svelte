<script lang="ts">
  import { Pane, Checkbox, Folder } from 'svelte-tweakpane-ui';
  import { settings } from '$lib/store.svelte';
  import { eases } from 'animejs';
  import { fly } from 'svelte/transition';

  let showCube = $state(true);
</script>

<Pane title="Settings" position="fixed">
  <Checkbox bind:value={settings.darkMode} label="Dark mode:" />
  <Checkbox bind:value={settings.grid} label="Grid:" />
  <Folder title="Params">
    <Checkbox bind:value={showCube} label="Show cube:" />
  </Folder>
</Pane>

<div class="relative flex h-full w-full items-center justify-center">
  {#if showCube}
    <span
      transition:fly={{
        y: window.screen.height / 2 + 100,
        opacity: 1,
        easing: eases.cubicBezier(0.7, 0, 0.2, 1)
      }}
      class="flex size-32 items-center justify-center rounded-2xl bg-amber-500 text-neutral-950"
    >
      shq
    </span>
  {/if}
</div>
