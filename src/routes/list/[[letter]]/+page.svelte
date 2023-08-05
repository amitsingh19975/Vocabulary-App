<div class="w-full h-full px-4 py-8 flex isolate" bind:this={parentRef}>
    {#if wordList.length > 0}
        <section aria-label="Word list section" class="w-[400px] grid grid-rows-[45px_1fr] gap-4 z-[1] overflow-hidden">
            <Input placeholder="Search" wrapperClass="mr-2" searchItems={wordList.map((w) => w.word)} on:search={handleSearch} label="Search">
                <MagnifyingGlass slot="start" class="text-white opacity-50" size={18} />
            </Input>
            <div role="menu" tabindex="0" on:focusin={onContainerFocusIn}>
                <VirtualList itemCount={wordList.length} itemSize={50} height={containerHeight} scrollToIndex={currentSelectedWordIndex} stickyIndices={[currentSelectedWordIndex]}>
                    <div
                        slot="item"
                        let:style
                        let:index
                        {style}
                        style:--item-bg-color="hsl(208, 13%, 19%)"
                        class="flex justify-start items-center word-list-item-wrapper {(currentSelectedWordIndex === index) ? 'before:bg-[var(--item-bg-color)]' : ''} overflow-hidden"
                        role="listitem"
                    >
                        <button
                            class="word-list-item"
                            class:active={currentSelectedWordIndex === index}
                            tabindex={currentSelectedWordIndex === index ? 0 : -1}
                            on:click={() => currentSelectedWordIndex = index}
                            on:keydown={(e) => onKeyDownEvent(e, index)}
                        >
                            <span class="w-full whitespace-normal break-words">{wordList[index].word}</span>
                        </button>
                    </div>
                </VirtualList>
            </div>
        </section>
        <section aria-label="Word information section" class="flex-grow min-w-[1000px] grid grid-rows-[45px_1fr] gap-4 z-0">
            <div class="flex items-center justify-end">
                <Checkbox bind:checked={memoryTest}>
                    Memory Test
                </Checkbox>
            </div>
            <div class="word-information mt-[2px] h-full" style:max-height={`${containerHeight-2}px`}>
                {#if wordList[currentSelectedWordIndex]}
                    <WordInformation word={wordList[currentSelectedWordIndex]} memoryTest={memoryTest} />
                {/if}
            </div>
        </section>
    {:else}
        <div class="flex-grow flex items-center justify-center flex-col opacity-50">
            <ExclamationTriangle size={48} class="text-white mr-4" />
            <div class="text-white text-2xl">No words found</div>
        </div>
    {/if}
</div>
<svelte:window on:hashchange={onNavigationChange} />

<script lang="ts">
	import { page } from '$app/stores';
	import Input from '$lib/components/input.svelte';
	import { onMount } from 'svelte';
	import type { WordSchema } from '../../../model/wordsSchema';
    import { MagnifyingGlass, ExclamationTriangle } from 'radix-icons-svelte';
    import VirtualList from 'svelte-tiny-virtual-list';
    import WordInformation from '$lib/components/wordInformation.svelte';
    import Checkbox from '$lib/components/checkbox.svelte';
    import { wordList as storeWordList } from '$lib/wordList';
	import { notificationStore } from '$lib/notificationStore';

    $: words = $storeWordList;
    let parentRef: HTMLDivElement;

    let memoryTest: boolean = false;

    function parseHash(hash: string) {
        if (hash === '#') return;
        if (hash.length > 0) return hash.slice(1);
        return;
    }

    let wordList: Array<WordSchema> = [];
    let currentSelectedWordIndex: number = 0;

    function initWordList(words: WordSchema[], letter?: string) {
        wordList = [];
        const normalizedLetter = letter?.[0]?.toLowerCase();
        for(const word of words) {
            word.word = word.word;
            if (!normalizedLetter || word.word[0] === normalizedLetter) wordList.push(word);
        }
    }

    onMount(() => {
        initWordList(words, $page.params.letter);
        onPageInit($page.url.hash);
    })

    function onPageInit(hash: string) {
        const word = parseHash(hash);
        if (word) {
            const normalizedWord = word.toLowerCase();
            const index = wordList.findIndex((w) => w.word === normalizedWord);
            if (index < 0) {
                notificationStore.add({
                    message: `The word "${word}" was not found in the list`,
                    type: 'danger',
                });
                return;
            }
            currentSelectedWordIndex = index >= 0 ? index : 0;
        } else {
            currentSelectedWordIndex = 0;
        }
    }

    function onNavigationChange() {
        onPageInit(window.location.hash);
    }

    let containerHeight: number = 500;
    $: {
        if (parentRef) {
            containerHeight = parentRef.clientHeight - 120;
        }
    }

    function onKeyDownEvent(e: KeyboardEvent, index?: number) {
        if (index !== currentSelectedWordIndex) return;
        const el = e.target as HTMLButtonElement;
        switch(e.key) {
            case 'ArrowDown': {
                currentSelectedWordIndex = Math.min(currentSelectedWordIndex + 1, words.length - 1);
                e.preventDefault();
                const siblingButton = el.parentElement?.nextElementSibling?.firstChild as HTMLButtonElement;
                requestAnimationFrame(() => {
                    if (!(siblingButton instanceof HTMLButtonElement)) return;
                    siblingButton.focus();
                });
                break;
            }
            case 'ArrowUp': {
                currentSelectedWordIndex = Math.max(currentSelectedWordIndex - 1, 0);
                e.preventDefault();
                const siblingButton = el.parentElement?.previousElementSibling?.firstChild as HTMLButtonElement;
                requestAnimationFrame(() => {
                    if (!(siblingButton instanceof HTMLButtonElement)) return;
                    siblingButton.focus();
                });
                break;
            }
        }
    }

    function onContainerFocusIn(e: FocusEvent) {
        const el = e.target as HTMLDivElement;
        const button = el.querySelector('button[tabindex="0"]') as HTMLButtonElement;
        if (button) button.focus();
    }

    function handleSearch(e: CustomEvent<string>) {
        const word = e.detail;
        const normalizedWord = word.toLowerCase();
        const index = wordList.findIndex((w) => w.word === normalizedWord);
        if (index < 0) return;
        currentSelectedWordIndex = index;
    }

</script>

<style scoped lang="postcss">

    .word-list-item-wrapper {
        @apply relative isolate;
    }
    .word-list-item-wrapper::before {
        content: '';
        position: absolute;
        right: -1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 90%;
        z-index: -1;
    }

    .word-list-item {
        @apply w-full h-[90%] text-start capitalize rounded-tl-full rounded-bl-full pl-4 mr-1 ml-1;
    }

    .word-list-item.active, .word-information {
        background-color: hsl(208, 13%, 19%);
    }

    .word-information {
        @apply p-2 px-5 rounded-lg rounded-tl-none;
    }
</style>