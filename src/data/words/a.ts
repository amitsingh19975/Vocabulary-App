import type { WordSchema } from '../../model/wordsSchema';

export default [
    {
        word: "abate",
        forms: ["verb"],
        defs: [
            {
                def: "to diminish in intensity",
                examples: [
                    "The storm suddenly abated.",
                    "The pain in his leg abated after he took the medication."
                ]
            }
        ],
        otherForms: [
            {
                form: "adj",
                word: "abated"
            },
            {
                form: "noun",
                word: "abatement"
            }
        ],
        links: [
            {
                link: "https://www.prepscholar.com/gre/blog/gre-vocabulary-list-words/",
                title: "The 357 Best GRE Vocabulary Words: Complete List"
            }
        ]
    },
    {
        word: "aberrant",
        forms: ["adj"],
        defs: [
            {
                def: "diverging from the standard type",
                examples: [
                    "The child's aberrant behavior worried his parents.",
                    "The aberrant weather made it difficult to plan our trip."
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "aberrance"
            },
            {
                form: 'adv',
                word: 'aberrantly'
            },
        ],
        links: [
            {
                link: "https://www.prepscholar.com/gre/blog/gre-vocabulary-list-words/",
                title: "The 357 Best GRE Vocabulary Words: Complete List"
            }
        ]
    },
    {
        word: "abjure",
        forms: ["verb"],
        defs: [
            {
                def: "to reject or renounce",
                examples: [
                    "The spy abjured his allegiance to his country when he was caught.",
                    "The politician abjured his former beliefs."
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "abjuration"
            },
        ],
        links: [
            {
                link: "https://www.prepscholar.com/gre/blog/gre-vocabulary-list-words/",
                title: "The 357 Best GRE Vocabulary Words: Complete List"
            }
        ]
    }
] as WordSchema[];