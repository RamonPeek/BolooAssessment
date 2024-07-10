import {Answer} from "./Answer";

export class Poll {
    id: number;
    question: string;
    answerOptions: Array<Answer>;

    constructor(id: number, question: string, answerOptions: Array<Answer>) {
        this.id = id;
        this.question = question;
        this.answerOptions = answerOptions;
    }
}