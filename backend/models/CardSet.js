class CardSet {
    constructor(cards, state){
        this.cards = cards;
        this.state = state;
    }
    addCard(card){
        this.cards.push(card);
    }
}