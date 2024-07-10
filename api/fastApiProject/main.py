from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Poll:
    def __init__(self, id, question, answerOptions):
        self.id = id
        self.question = question
        self.answerOptions = answerOptions

class Answer:
    def __init__(self, id, text):
        self.id = id
        self.text = text

class Voter:
    def __init__(self, pollId, firstName: str, lastName: str):
        self.pollId = pollId
        self.firstName = firstName
        self.lastName = lastName

votes = []
polls = [
    Poll(1, "What is your favourite music genre?", [
        Answer(1, "Rock"),
        Answer(2, "Pop"),
        Answer(3, "Country")
    ])
]

@app.get("/polls/{pollId}")
async def getPollById(pollId: int):
    foundPoll: None
    for poll in polls:
        if(poll.id == pollId):
            foundPoll = poll

    if foundPoll is None:
        raise HTTPException(status_code=404, detail="Could not find poll with specified id!")
    else:
        return foundPoll

@app.get("/polls/{pollId}/votes")
async def getPollVotes(pollId: int):
    if not pollId:
        raise HTTPException(status_code=400, detail="PollId is required!")

    #Usually you would query these votes as much as possible on the DB side (where pollId = pollId).
    pollVotes = []
    for vote in votes:
        if(vote.pollId == pollId):
            pollVotes.append(vote)

    return pollVotes

@app.post("/polls/{pollId}/vote/{firstName}/{lastName}") #Usually things such as firstName and lastName would be retrieved from an accountIdentifier retrieved from an auth token/identifier.
async def vote(pollId: int, firstName: str, lastName: str):
    if not pollId:
        raise HTTPException(status_code=400, detail="PollId is required!")

    if not firstName or not lastName:
        raise HTTPException(status_code=400, detail="Firstname and lastname are required!")

    if any(vote.firstName == firstName and vote.lastName == lastName for vote in votes):
        raise HTTPException(status_code=400, detail="Already voted!")

    vote = Voter(pollId, firstName, lastName)

    votes.append(vote)
    return vote