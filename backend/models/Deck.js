class Deck {
    constructor(decksNumber){
        this.decksNumber = decksNumber;
        this.deck = this.getNewDeck();
    }
    getNewDeck(){
        var deck = [];
        for (var i = 0; i < this.decksNumber * 52; ++i) deck[i] = i;
        var currentIndex = deck.length, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
        }
        return deck;
    }
    getCard(visible){
        const card = this.deck.pop();
        if(this.deck.length < this.decksNumber * 52){
            this.deck = this.getNewDeck();
        }
        return {visible, rank: card % 13, suit: Math.floor(card / 13) % 4};
    }
    getCardsNumber(){
        return this.deck.length;
    }
}

export default Deck;