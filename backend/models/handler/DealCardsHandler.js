const getDealCardsHandler = (mode) => (game) => {
    // get first card
    game.getPlayers("ACTIVE").forEach(p => {
        p.cardSets[0].addCard([game.deck.getCard(true)]);
    });
    game.getDealer().cardSets[0].addCard([game.deck.getCard(true)]);
    // get second card
    game.getPlayers("ACTIVE").forEach(p => {
        p.cardSets[0].addCard(game.deck.getCard(mode === "classic"));
    });
    game.getDealer().cardSets[0].addCard(game.deck.getCard(false));
}

export default getDealCardsHandler;