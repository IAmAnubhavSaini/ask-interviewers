#!/usr/bin/env node

import { Command } from "commander";
import { black, blue, cyan, green, magenta, red, white, yellow } from "./colors.js";
import type { tQuestionsEntity, tPriority } from "./questions.js";
import { data } from "./questions.js";

const program = new Command();
program.name("ask_questions").description("CLI tool for interview questions").version("1.0.0");

program
    .option("-p, --priority <priority>", "Filter by priority (Top, High, Mid, Low, No, unassigned)")
    .option("-t, --tags <tags...>", "Filter by tags")
    .option("-w, --who <who...>", "Filter by who")
    .option("-a, --all", "Show all questions")
    .option("-b, --no_color", "Disable colored output (bland)", false);

program.parse();
const options = program.opts();

console.log({ options });

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
    switch (priority.toLocaleLowerCase()) {
        case "top":
            return red(priority);
        case "high":
            return yellow(priority);
        case "mid":
            return blue(priority);
        case "low":
            return green(priority);
        case "no":
            return black(priority);
        case "unassigned":
            return white(priority);
        default:
            return priority;
    }
}

function getPriorityWeight(priority: tPriority): number {
    switch (priority.toLocaleLowerCase()) {
        case "top":
            return 0;
        case "high":
            return 10;
        case "mid":
            return 20;
        case "low":
            return 30;
        case "no":
            return 40;
        case "unassigned":
            return 100;
        default:
            return 1000;
    }
}

export function sortByPriority(questions: tQuestionsEntity[]): tQuestionsEntity[] {
    return [...questions].sort((a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority));
}

function prettyPrintQuestion(question: Partial<tQuestionsEntity>, index: number, options: any): void {
    const priority = options.no_color
        ? question.priority
        : getPriorityColor(question.priority as tPriority) ;
    console.log(`\n[${priority}]`);
    console.log(`${index + 1}. ${question.question}`);

    if (question.tags?.length ?? -1 > 0) {
        const tags = options.no_color
            ? question.tags?.join(" ") ?? ""
            : cyan(question.tags?.join(" ") ?? "") ;
        console.log(`\t${tags}`);
    }

    if (question.followups?.length ?? -1 > 0) {
        const followups = options.no_color
            ? question.followups?.join("\n\t")
            : question.followups?.map((f): string => magenta(f)).join("\n\t");
        console.log(`\t${followups}`);
    }

    if (question.references?.length ?? -1 > 0) {
        const references = options.no_color
            ? question.references?.join("\n\t")
            : question.references?.map((r): string => black(r)).join("\n\t");
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
