<script lang="ts">
    import { page } from '$app/state';
    import { hasSettingsContext, setSettingsContext } from '$lib/state/settings.svelte';

    const { children } = $props();

    const { settings } = page.data;
    if (!hasSettingsContext()) setSettingsContext(settings);
</script>

<div id="content">
    {@render children?.()}
</div>
