import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const chats =[
    //
    { 
        _id:uuid(),
        sender:'chanchalpanpaliya@gmail.com',
        receiver:'rahulpant@gmail.com',
        text:'hello , good morning mayur ',
        datetime:new Date()
    },
    { 
        _id:uuid(),
        sender:'rahulpant@gmail.com',
        receiver:'chanchalpanpaliya@gmail.com',
        text:'hello , how are you chanchal',
        datetime:new Date()
    },
    //
    { 
        _id:uuid(),
        sender:'chanchalpanpaliya@gmail.com',
        receiver:'aniketsharma@123',
        text:'hello , good morning krupa ',
        datetime:new Date()
    },
    { 
        _id:uuid(),
        sender:'aniketsharma@123',
        receiver:'chanchalpanpaliya@gmail.com',
        text:'hello , how are you chanchal...',
        datetime:new Date()
    },
    //
    { 
        _id:uuid(),
        sender:'chanchalpanpaliya@gmail.com',
        receiver:'himanshiraja@123',
        text:'hello , good morning shruti..',
        datetime:new Date()
    },
    { 
        _id:uuid(),
        sender:'himanshiraja@123',
        receiver:'chanchalpanpaliya@gmail.com',
        text:'hey chanchau...',
        datetime:new Date()
    },
    //
    { 
        _id:uuid(),
        sender:'chanchalpanpaliya@gmail.com',
        receiver:'ankitaLokahde@12',
        text:'hello , good morning priya..',
        datetime:new Date()
    },
    { 
        _id:uuid(),
        sender:'ankitaLokahde@12',
        receiver:'chanchalpanpaliya@gmail.com',
        text:'hey chanchau i am priya here...',
        datetime:new Date()
    },
    //
]