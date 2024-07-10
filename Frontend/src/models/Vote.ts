export class Vote {
    pollId: number;
    answerId: number;
    firstName: string;
    lastName: string;

    constructor(pollId: number, answerId: number, firstName: string, lastName: string) {
        this.pollId = pollId;
        this.answerId = answerId;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}