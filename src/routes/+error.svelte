<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="pb-safe-and-4 mx-4 flex w-full grow flex-col items-center justify-between">
    <div class="flex w-full grow flex-col items-center justify-center gap-4">
        <h1 class="h1">Error</h1>
        {#if page.error}
            <p class="text-center text-lg whitespace-pre-line">{page.error.message}</p>
        {/if}
    </div>
</div>
