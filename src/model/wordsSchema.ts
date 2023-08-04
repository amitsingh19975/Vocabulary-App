export type WordSchema = {
    word: string;
    form: 'verb' | 'adj' | 'noun' | 'adv';
    defs?: Array<{
        def: string;
        examples: Array<string>;
    }>;
    otherForms?: Array<{
        form: WordSchema['form'];
        word: string;
    }>;
    links?: Array<{
        link: string;
        title: string;
    }>;
};

export type WordHistory = {
    word: string,
    stats: {
        attempts: number,
        correct: number,
    }
    lastAttempt: number,
}
