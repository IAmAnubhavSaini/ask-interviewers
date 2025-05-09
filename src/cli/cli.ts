#!/usr/bin/env node

import type { tQuestionsEntity } from "./data/questions.d.ts";
import { data } from "./data/questions.js";

data.questions
    .filter((question: tQuestionsEntity) => question.question.length > 0)
    .map((question: tQuestionsEntity) => nonEmptyQuestion(question))
    .map(prettyPrintQuestion);

function prettyPrintQuestion(question: Partial<tQuestionsEntity>): void {
    console.log(`\n[${question.priority}]`);
    console.log(`${question.question}`);
    if (question.tags?.length ?? -1 > 0) {
        console.log(`\t${question.tags?.join(" ")}`);
    }
    if (question.followups?.length ?? -1 > 0) {
        console.log(`\t${question.followups?.join("\n\t")}`);
    }
    if (question.references?.length ?? -1 > 0) {
        console.log(`\t${question.references?.join("\n")}`);
    }
}

function nonEmptyQuestion(question: tQuestionsEntity): Partial<tQuestionsEntity> {
    const out: Partial<tQuestionsEntity> = { ...question };
    if (question.followups.length === 0) {
        delete out.followups;
    }
    if (question.potentialAnswers.length === 0) {
        delete out.potentialAnswers;
    }
    if (question.references.length === 0) {
        delete out.references;
    }
    if (question.priority === "unassigned") {
        delete out.priority;
    }
    if (question.tags.length === 0) {
        delete out.tags;
    }
    if (question.who.length === 0) {
        delete out.who;
    }
    return out;
}
