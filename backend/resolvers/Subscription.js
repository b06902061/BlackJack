const Subscription = {
    subscribeRoom: {
        subscribe(_, {roomID}, {pubSub}, info){
            return pubSub.asyncIterator(`room_${roomID}`);
        }
    }
}

export default Subscription;