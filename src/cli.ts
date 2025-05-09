#!/usr/bin/env node

import { Command } from "commander";
import { black, blue, cyan, green, magenta, red, white, yellow } from "./colors.js";
import type { tQuestionsEntity, tPriority } from "./data/questions.d.ts";
import { data } from "./data/questions.js";


const program = new Command();
program.name("ask_questions").description("CLI tool for interview questions").version("1.0.0");

program
    .option("-p, --priority <priority>", "Filter by priority (Top, High, Mid, Low, No, unassigned)")
    .option("-t, --tags <tags...>", "Filter by tags")
    .option("-w, --who <who...>", "Filter by who")
    .option("-a, --all", "Show all questions")
    .option("-c, --color", "Enable colored output", true);

program.parse();
const options = program.opts();

const qs = filterQuestions(data.questions, options);
sortByPriority(qs)
    .map((question: tQuestionsEntity) => nonEmptyQuestion(question))
    .forEach((question, index) => prettyPrintQuestion(question, index, options));

export function filterQuestions(questions: tQuestionsEntity[], options: any): tQuestionsEntity[] {
    return questions
        .filter((question: tQuestionsEntity) => question.question.length > 0)
        .filter((question: tQuestionsEntity) => {
            if (options.priority && question.priority !== options.priority) {
                return false;
            }
            if (options.tags && !options.tags.every((tag: string) => question.tags.some((t) => t.includes(tag)))) {
                return false;
            }
            if (options.who && !options.who.every((who: string) => question.who.some((w) => w.includes(who)))) {
                return false;
            }
            return true;
        });
}

function getPriorityColor(priority: tPriority): string {
    const colors = {
        Top: red,
        High: yellow,
        Mid: blue,
        Low: green,
        No: black,
        unassigned: white,
    };
    return colors[priority]?.(priority) || priority;
}

function getPriorityWeight(priority: tPriority): number {
    const weights = {
        Top: 0,
        High: 1,
        Mid: 2,
        Low: 3,
        No: 4,
        unassigned: 5,
    };
    return weights[priority] ?? 6;
}

export function sortByPriority(questions: tQuestionsEntity[]): tQuestionsEntity[] {
    return [...questions].sort((a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority));
}

function prettyPrintQuestion(question: Partial<tQuestionsEntity>, index: number, options: any): void {
    const priority = options.color ? getPriorityColor(question.priority as tPriority) : question.priority;
    console.log(`\n[${priority}]`);
    console.log(`${index + 1}. ${question.question}`);

    if (question.tags?.length ?? -1 > 0) {
        const tags = options.color ? cyan(question.tags?.join(" ") ?? "") : question.tags?.join(" ") ?? "";
        console.log(`\t${tags}`);
    }

    if (question.followups?.length ?? -1 > 0) {
        const followups = options.color
            ? question.followups?.map((f) => magenta(f)).join("\n\t")
            : question.followups?.join("\n\t");
        console.log(`\t${followups}`);
    }

    if (question.references?.length ?? -1 > 0) {
        const references = options.color
            ? question.references?.map((r) => black(r)).join("\n\t")
            : question.references?.join("\n\t");
        console.log(`\t${references}`);
    }
}

function nonEmptyQuestion(question: tQuestionsEntity): Partial<tQuestionsEntity> {
    const out: Partial<tQuestionsEntity> = { ...question };
    if (question.followups.length === 0) delete out.followups;
    if (question.potentialAnswers.length === 0) delete out.potentialAnswers;
    if (question.references.length === 0) delete out.references;
    if (question.tags.length === 0) delete out.tags;
    if (question.who.length === 0) delete out.who;
    return out;
}
