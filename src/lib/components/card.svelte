<div
    class="w-fit card-wrapper {className}"
    {style}
    {...$$restProps}
>
    {#if $$slots.header}
        <header class="bg-black bg-opacity-20 p-2 border-b border-white border-opacity-20">
            <slot name="header"></slot>
        </header>
    {/if}
    <slot></slot>
    {#if $$slots.footer}
        <footer class="bg-black bg-opacity-20 p-2 border-t border-white border-opacity-20">
            <slot name="footer"></slot>
        </footer>
    {/if}
</div>

<script lang="ts">

    export let className = '';
    export let style = '';
    export { className as class };

</script>

<style lang="postcss" scoped>
    .card-wrapper {
        --card-bg-color-hsl: 206 12% 21%;
        --card-border-color-hsl: 206 12% 30%;
        background-color: hsl(var(--card-bg-color-hsl) / 0.7);
        border: 1px solid hsl(var(--card-border-color-hsl));
        @apply rounded overflow-hidden;
    }
</style>
