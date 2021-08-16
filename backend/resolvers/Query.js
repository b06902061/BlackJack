const Query = {
    async isHost(_, {id, roomID}, {rooms}){
        const room = rooms.get(roomID);
        if(room.hostID === null){
            room.hostID = id;
            return true;
        }
        return false;
    },
    async getRoom(_, {roomID}, {rooms}){
        return rooms.get(roomID);
    }
}

export default Query;