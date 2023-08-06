<div class="w-full h-full flex items-center justify-center">
    {#if !viewWordDefinition}
        <Card class="min-w-[25rem]" role="region" aria-label="Flashcard for the word">
            <div slot="header" class="relative">
                <span
                    class="opacity-60 text-sm absolute top-1/2 -translate-y-1/2"
                    aria-label="{currentWordIndex + 1} of {quizWords.length + 1} words"
                    aria-live="polite" aria-atomic="true"
                >
                    {currentWordIndex + 1} of {quizWords.length + 1}
                </span>
                <h2 class="text-lg font-medium text-center opacity-80">Word</h2>
            </div>
            {#if currentWordIndex < quizWords.length}
                <div class="flex justify-center py-8 h-[10rem] items-center" aria-live="polite">
                    <h1
                        class="capitalize font-bold text-3xl tracking-wide"
                        class:text-white={quizWords[currentWordIndex].origin === 'new'}
                        class:text-yellow-200={quizWords[currentWordIndex].origin === 'history'}
                    >
                        {quizWords[currentWordIndex].word}
                    </h1>
                </div>
            {:else}
                {#if viewStats}
                    <div class="flex items-center justify-between py-8 px-8 gap-8 min-h-[10rem] h-full">
                        <div>
                            <span class="text-4xl font-bold text-emerald-200">{correctWordCount}</span>
                            <span class="text-lg opacity-80">Knew</span>
                        </div>
                        <div>
                            <span class="text-4xl font-bold text-rose-200">{quizWords.length - correctWordCount}</span>
                            <span class="text-lg opacity-80">New or Forgot</span>
                        </div>
                    </div>
                {:else}
                    <div class="py-8 flex justify-center items-center flex-col text-emerald-200 min-h-[10rem]" aria-live="polite">
                        <CheckCircled size={48} />
                        <h1 class="text-center text-3xl opacity-80">Quiz finished</h1>
                    </div>
                {/if}
            {/if}
            <div slot="footer">
                {#if currentWordIndex < quizWords.length}
                    <div class="flex flex-col gap-2">
                        <Button expand fill="outline" color="danger" on:click={onIncorrectWordClick} aria-label="I don't know the answer">I don't know</Button>
                        <Button expand fill="outline" color="success" on:click={onCorrectWordClick} aria-label="I know the answer">I know</Button>
                        <Button expand fill="ghost" color="light" on:click={onViewWord} aria-label="See word definition">Cheat</Button>
                    </div>
                {:else}
                    <div class="flex flex-col gap-2">
                        <Button expand aria-label="Finish" color="success" on:click={onFinishClick}>Finish</Button>
                        <Button expand aria-label="View" fill="ghost" on:click={() => viewStats = !viewStats }>{viewStats ? 'Hide' : 'View'} Stats</Button>
                        <Button expand color="warning" fill="ghost" on:click={() => currentWordIndex = 0} aria-label="Restart">Restart</Button>
                    </div>
                {/if}
            </div>
        </Card>
    {:else}
        <Card class="min-w-[40rem] h-[90%] grid grid-rows-[93%_auto]">
            <div class="px-4 py-2">
                <WordInformation
                    word={getCurrentWord(currentWordIndex)}
                />
            </div>
            <div slot="footer">
                <Button expand fill="ghost" color="light" on:click={() => viewWordDefinition = false}>Back</Button>
            </div>
        </Card>
    {/if}
</div>

<script lang="ts">
    import { page } from '$app/stores';
    import seedRandom from 'seedrandom';
    import { wordHistory, wordList } from '$lib/wordList';
	import type { WordHistory, WordSchema } from '../../../model/wordsSchema';
    import Card from '$lib/components/card.svelte';
    import { CheckCircled } from 'radix-icons-svelte';
    import Button from '$lib/components/button.svelte';
    import WordInformation from '$lib/components/wordInformation.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';

    let history: WordHistory[] = $wordHistory;

    type Config = {
        amountOfWords: number;
        randomSeed?: string;
        percentageOfWordsFromHistory: number;
        groupBy?: { key: string, childKey: string },
    }

    let config: Config = {
        amountOfWords: 20,
        randomSeed: undefined,
        percentageOfWordsFromHistory: 10,
    }

    let quizWords: Array<{
        word: string,
        origin: 'history' | 'new',
    }> = [];
    let correctWordCount = 0;
    let currentWordIndex = 0;
    let viewStats = false;
    let viewWordDefinition = false;


    $: {
        if (browser) {
            const amtWordsString = $page.url.searchParams.get('amt_words') ?? '20';
            const randomSeed = $page.url.searchParams.get('seed') ?? undefined;
            const percentageOfWordsFromHistoryString = $page.url.searchParams.get('perc_history') ?? '10';
            const groupBy = $page.url.searchParams.get('group_by') ?? undefined;

            let groupByObj: Config['groupBy'] = undefined;

            try {
                groupByObj = groupBy ? JSON.parse(groupBy) : undefined;
            } catch(e) {
                console.error(e);
            }
    
            const amtWords = parseInt(amtWordsString);
            const percentageOfWordsFromHistory = parseInt(percentageOfWordsFromHistoryString);
            config = {
                amountOfWords: Number.isNaN(amtWords) ? 20 : amtWords,
                randomSeed: randomSeed ? randomSeed : undefined,
                percentageOfWordsFromHistory: Number.isNaN(percentageOfWordsFromHistory) ? 10 : percentageOfWordsFromHistory,
                groupBy: groupByObj,
            }
        }
    }

    $: randomGenerator = config.randomSeed ? seedRandom.alea(config.randomSeed) : Math.random;

    $: {
        randomGenerator;
        initWords();
    }

    function numberOfIncorrect(w: WordHistory) {
        return w.stats.attempts - w.stats.correct;
    }

    function doesSatisfyGroupBy(word: WordSchema | undefined) {
        if (!config.groupBy || word == null) return true;
        const childKey = config.groupBy.childKey;
        if (!childKey) return true;
        switch(config.groupBy.key) {
            case 'link': return Boolean(word.links?.some((el) => el.link === childKey));
            default: return true;
        }
    }

    function initWords() {
        quizWords = [];

        let historyLen = Math.floor(quizWords.length * (config.percentageOfWordsFromHistory / 100));
        history.sort((a, b) => {
            return numberOfIncorrect(b) - numberOfIncorrect(a);
        });

        const wordSet = new Set<string>();

        for (let i = 0; i < historyLen && i < history.length; i++) {
            const word = history[i];
            const wordSchema = $wordList.find(w => w.word === word.word);
            if (doesSatisfyGroupBy(wordSchema)) {
                quizWords.push({
                    word: word.word,
                    origin: 'history',
                });
            }
            wordSet.add(word.word);
        }

        const remainingWords = config.amountOfWords - quizWords.length;
        for (let i = 0; i < remainingWords && $wordList.length; i++) {
            const word = $wordList[Math.floor(randomGenerator() * $wordList.length)];
            if (!wordSet.has(word.word)) {
                if (doesSatisfyGroupBy(word)) {
                    quizWords.push({
                        word: word.word,
                        origin: 'new',
                    });
                }
                wordSet.add(word.word);
            }
        }

        quizWords.sort(() => randomGenerator() - 0.5);
    }

    function onCorrectWordClick() {
        const word = quizWords[currentWordIndex];
        correctWordCount++;
        const historyItem = history.find(w => w.word === word.word);
        if (historyItem) {
            historyItem.stats.correct++;
            historyItem.stats.attempts++;
            historyItem.lastAttempt = Date.now();
        } else {
            history.push({
                word: word.word,
                stats: {
                    correct: 1,
                    attempts: 1,
                },
                lastAttempt: Date.now(),
            });
        }
        wordHistory.set(history);
        currentWordIndex++;
    }

    function onIncorrectWordClick() {
        const word = quizWords[currentWordIndex];
        const historyItem = history.find(w => w.word === word.word);
        if (historyItem) {
            historyItem.stats.attempts++;
            historyItem.lastAttempt = Date.now();
        } else {
            history.push({
                word: word.word,
                stats: {
                    correct: 0,
                    attempts: 1,
                },
                lastAttempt: Date.now(),
            });
        }
        wordHistory.set(history);
        currentWordIndex++;
    }

    function onViewWord() {
        viewWordDefinition = true;
    }

    function getCurrentWord(index: number) {
        return $wordList.find(w => w.word === quizWords[index].word)!;
    }

    function onFinishClick() {
        goto(`${base}/quiz-mode`);
    }
</script>
