import getDealCardsHandler from "./handler/DealCardsHandler";

class GameHandler {
    constructor(game, setting){
        this.game = game;
        this.setting = setting;
        this.dealCardsHandler = getDealCardsHandler(setting.ruleSetting.mode);
        this.thresholdHanler = getThresholdHandler(setting.ruleSetting.threshold);
    }
    deal(){
        this.dealCardsHandler(game);
    }
}

export default GameHandler;