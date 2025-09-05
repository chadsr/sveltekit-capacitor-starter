<script lang="ts">
    import { page } from '$app/state';
    import * as m from '$lib/paraglide/messages';
    import { locales, localizeHref } from '$lib/paraglide/runtime';
    import '../app.css';
    import { setSettingsContext } from '$lib/state/settings.svelte';
    import { resolve } from '$app/paths';

    const { children } = $props();
</script>

<svelte:head>
    <title>{page.data.title ? page.data.title : m.app_name()}</title>
    {#if page.data.description}
        <meta name="description" content={page.data.description} />
    {/if}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
</svelte:head>

<div class="m-4 h-screen">
    <h1 class="my-4 text-center text-xl font-bold">{page.data.title}</h1>

    {@render children()}
</div>

<div class="hidden">
    {#each locales as locale (locale)}
        {@const localizedHref = resolve(localizeHref(page.url.pathname, { locale }) as '/')}
        <a href={localizedHref}>{locale}</a>
    {/each}
</div>
