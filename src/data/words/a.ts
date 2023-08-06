import type { WordSchema } from '../../model/wordsSchema';

const GRE_LINK: NonNullable<WordSchema['links']>[number] = {
    link: "https://www.prepscholar.com/gre/blog/gre-vocabulary-list-words/",
    title: "The 357 Best GRE Vocabulary Words: Complete List"
}

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
        links: [GRE_LINK]
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
        links: [GRE_LINK]
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
        links: [GRE_LINK]
    },
    {
        word: "abscond",
        forms: ["verb"],
        defs: [
            {
                def: "to leave secretly, often to avoid prosecution or evade detection",
                examples: [
                    "The thief absconded with the money and was almost hidden for a year.",
                    "A CEO who absconded after embezzling millions of dollars was finally caught.",
                    'She <i title="Collocation: abscond from something" data-word-type="collocation">absconded from</i> boarding school and hitchhiked to the city'
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "absconder"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "abstain",
        forms: ["verb"],
        defs: [
            {
                def: "to voluntarily refrain from doing something",
                examples: [
                    'The doctor told the patient to <i title="Collocation: abstain from something" data-word-type="collocation">abstain from</i> eating fatty foods.',
                    'The politician <i title="Collocation: abstain from something" data-word-type="collocation">abstained from</i> voting on the bill.'
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "abstention"
            },
            {
                form: "adj",
                word: "abstinent"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "acumen",
        forms: ["noun"],
        defs: [
            {
                def: "keen judgement and perception",
                examples: [
                    "The lawyer's acumen helped him win many cases.",
                    "The CEO's **business/financial** acumen helped her company grow."
                ]
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "admonish",
        forms: ["verb"],
        defs: [
            {
                def: "to warn or scold someone",
                examples: [
                    "The teacher admonished the student **for** talk**ing** in class.",
                    "The mother admonished her child **not to** run into the street.",
                    "The judge admonished the defendant **to** tell the truth."
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "admonishment"
            },
            {
                form: "adj",
                word: "admonitory"
            },
            {
                form: "noun",
                word: "admonition"
            },
            {
                form: "adv",
                word: "admonishingly"
            }
        ],
        links: [GRE_LINK]
    },
    {
        word: "adulterate",
        forms: ["verb"],
        defs: [
            {
                def: "to make impure by adding lesser substances, or to contaminate",
                examples: [
                    "The company was fined for adulterating its products **with** cheap chemicals.",
                ]
            }
        ],
        otherForms: [
            {
                form: "noun",
                word: "adulteration"
            },
        ],
        links: [GRE_LINK]
    },
    {
        word: "advocate",
        forms: ["verb", "noun"],
        defs: [
            {
                def: "to support or recommend publicly",
                form: "verb",
                examples: [
                    "The new green deal advocates **for** a more sustainable future, but the opponents of this deal are given a hard time.",
                    "He advocates the use of solar power.",
                ]
            },
            {
                def: "one who advocates",
                form: "noun",
                examples: [
                    "The advocate of the new green deal is a young politician.",
                ]
            }
        ],
        links: [GRE_LINK]
    }
] as WordSchema[];