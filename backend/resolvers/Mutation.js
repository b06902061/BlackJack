import { v4 as uuidv4 } from "uuid";
import Room from "../models/Room.js";
import Deck from "../models/Deck.js";
import Person from "../models/Person.js";
import Game from "../models/Game.js";
import getDealCardsHandler from "../models/handler/DealCardsHandler.js";


const Mutation = {
    async createRoom(_, {setting}, {rooms, pubSub}){
        const roomID = "";
        const seats = Array.from({length: setting.roomSetting.roomSize}, (_, i) => new Seat(i, setting.roomSetting.roomSize));
        const deck = new Deck(setting.roomSetting.decksNumber);
        const game = new Game(seats, deck, "PAUSE");
        const gameHandler = new GameHandler(game, setting);
        const room = new Room(roomID, game, setting, gameHandler);
        rooms.set(roomID, room);
        // pubSub(`room_${roomID}`, {subscribe: room});
        return room;
    },
    async chooseSeat(_, {roomID, name, index, originalIndex}, {rooms, pubSub}){
        const room = rooms.get(roomID);
        if(originalIndex < 0) room.game.seats[index].setPerson(new Person(name));
        else {
            room.game.seats[index].setPerson(room.game.seats[originalIndex].getPerson());
            room.game.seats[originalIndex].clearPerson();
        }
        pubSub.publish(`room_${roomID}`, {subscribe: room});
        return room;
    },
    async startGame(_, {roomID}, {rooms, pubSub}){
        const room = rooms.get(roomID);
        room.game.getPlayers("ACTIVE").forEach(p => {
            p.actions = ["BET"];
        });
        pubSub.publish(`room_${roomID}`, {subscribe: room});
        room.game.waitAllPlayersBet()
            .then(() =>{
                room.handlers.dealCardsHandler(room.game);
                pubSub.publish(`room_${roomID}`, {subscribe: room});
            });
        return room;
    },
    async setBet(_, {roomID, index, bet}, {rooms, pubSub}){
        const room = rooms.get(roomID);
        room.game.seats[index].getPerson().setBet(bet);
        room.game.seats[index].clearActions();
        pubSub.publish(`room_${roomID}`, {subscribe: room});
        return room;
    },
    async hit(_, {roomID, index}, {rooms, pubSub}){
        const room = rooms.get(roomID);
        room.game.seats[index].cardSets[0].push(room.game.deck.getCard(true));
        pubSub.publish(`room_${roomID}`, {subscribe: room});
        return room;
    },
    async stand(_, {roomID, index}, {rooms, pubSub}){
        const room = rooms.get(roomID);
        room.game.seats[index].endTurn();
        room.game.nextTurn(index + 1);
        pubSub.publish(`room_${roomID}`, {subscribe: room});
        return room;
    }
}

export default Mutation;