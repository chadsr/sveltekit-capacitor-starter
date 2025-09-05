<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
</script>

<div class="flex flex-col gap-4">
    <p>This page is pre-rendered using SSR.</p>
    <button class="rounded-full bg-yellow-500 p-2" onclick={async () => await goto(resolve('/'))}
        >SPA</button
    >
</div>
