class Game{
    constructor(seats, deck, state){
        this.seats = seats;
        this.deck = deck;
        this.state = state;
    }
    getPlayers(){
        const players = this.seats.slice(0, this.seats.length - 1);
        if(arguments.length === 0) return players;
        return players.filter(p => [...arguments].includes(p.state));
    }
    getDealer(){
        return this.seats.slice(-1)[0];
    }
    waitAllPlayersBet(){
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if(this.getPlayers("ACTIVE").every(p => p.noAction())){
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        })
    }
    nextTurn(index){
        for(var i = index; i < this.seats.length; ++i){
            if(seats[i] && seats[i].state === "ACTIVE"){
                // 
            }
        }
    }
}

export default Game;