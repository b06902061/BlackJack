class Room {
    constructor(roomID, game, setting, gameHandler) {
        this.roomID = roomID;
        this.hostID = null;
        this.member = new Map();
        this.game = game;
        this.setting = setting;
        this.gameHandler = gameHandler;
    }
}

export default Room;