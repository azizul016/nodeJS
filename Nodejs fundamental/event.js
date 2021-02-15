const EventEmitter = require('events');
// const event = new EventEmitter();

//listening event;
// event.on("loadMessage",(arg)=>{
//     console.log('Hello',arg);
//     console.log('Listening to event');
// })

//emitting event - raising event;

// event.emit('loadMessage', "Rana")


class myEvent extends EventEmitter{
    log(message){
        this.emit('loadMessage', message)
    }
}

const event = new myEvent();

event.on('loadMessage', (message) =>{
    console.log('hello',message);
    console.log('Listening to Event');
})

event.log('azizul')