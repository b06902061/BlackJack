class Seat {
    constructor(index, roomSize){
        this.index = index;
        this.isPlayer = index < roomSize - 1;
        this.person = null;
        this.actions = [];
        this.cardSets = [new CardSet([], "EMPTY")];
        this.state = "UNSEATED";
    }
    setPerson(person){
        this.person = person;
        this.state = "ACTIVE";
    }
    getPerson(){
        return this.person;
    }
    clearPerson(){
        this.person = null;
        this.state = "UNSEATED";
    }
    setState(){
        this.state = state;
    }
    getState(){
        return this.state;
    }
    noAction(){
        return this.actions.length === 0;
    }
    clearActions(){
        this.actions = [];
    }
    endTurn(){
        this.state = "ACTIVE";
        this.clearActions();
    }
}