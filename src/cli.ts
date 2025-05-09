#!/usr/bin/env node

import { Command } from "commander";
import { blackSoft, blueSoft, cyanSoft, greenSoft, magentaSoft, redSoft, whiteSoft, yellowSoft } from "./colors.js";
import type { tQuestionsEntity, tPriority } from "./questions.js";
import { data } from "./questions.js";

const program = new Command();
program.name("ask_questions").description("CLI tool for interview questions").version("1.0.0");

program
    .option("-p, --priority <priority>", "Filter by priority (Top, High, Mid, Low, No, unassigned)")
    .option("-t, --tags <tags...>", "Filter by tags")
    .option("-w, --who <who...>", "Filter by who")
    .option("-a, --all", "Show all questions")
    .option("-b, --no_color", "Disable colored output (bland)", false)
    .option("-d, --debug", "Debug", false);

program.parse();
const options = program.opts();

if (options.debug) {
    console.log({ options });
}

const filteredQuestions = filterQuestions(data.questions, options);
if (options.debug) {
    console.log({ filteredQuestions, data });
}

sortByPriority(filteredQuestions)
    .map((question: tQuestionsEntity) => nonEmptyQuestion(question))
    .forEach((question, index) => prettyPrintQuestion(question, index, options));

function filterQuestions(questions: tQuestionsEntity[], options: any): tQuestionsEntity[] {
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
            return redSoft(priority);
        case "high":
            return yellowSoft(priority);
        case "mid":
            return blueSoft(priority);
        case "low":
            return greenSoft(priority);
        case "no":
            return blackSoft(priority);
        case "unassigned":
            return whiteSoft(priority);
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

function sortByPriority(questions: tQuestionsEntity[]): tQuestionsEntity[] {
    return [...questions].sort((a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority));
}

function prettyPrintQuestion(question: Partial<tQuestionsEntity>, index: number, options: any): void {
    const priority = options.no_color ? question.priority : getPriorityColor(question.priority as tPriority);
    console.log(`\n[${priority}]`);
    console.log(`${index + 1}. ${question.question}`);

    if (question.tags?.length ?? -1 > 0) {
        const tags = options.no_color ? question.tags?.join(" ") ?? "" : cyanSoft(question.tags?.join(" ") ?? "");
        console.log(`\t${tags}`);
    }

    if (question.followups?.length ?? -1 > 0) {
        const followups = options.no_color
            ? question.followups?.join("\n\t")
            : question.followups?.map((f): string => magentaSoft(f)).join("\n\t");
        console.log(`\t${followups}`);
    }

    if (question.references?.length ?? -1 > 0) {
        const references = options.no_color
            ? question.references?.join("\n\t")
            : question.references?.map((r): string => blackSoft(r)).join("\n\t");
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
