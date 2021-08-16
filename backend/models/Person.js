class Person {
    constructor(name) {
        this.name = name;
        this.cash = 0;
        this.bet = 0;
    }
    setBet(bet){
        this.bet = bet;
        this.cash -= bet;
    }
}

export default Person;