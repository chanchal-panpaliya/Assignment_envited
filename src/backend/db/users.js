import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
		_id: "qwertyuiop11",
		firstName: "chanchal",
		lastName: "panpaliya",
		username: "chanchalpanpaliya@gmail.com",
		password: "chanchal123",
    //
    Intro: "Front-end web developer. Actively looking for job in web development in React JS.",
    WorkAt:"Buzzybrains",
    HomeTown:"Akola",
    CurrentLocation:"Pune",
    Position:"web developer",
    Education:"MCA",
    Birthdate:"1995-09-12",
    Hobbys:"Dancing and Video Editing",
    profileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1657479753/chanchal_j0tmjv.jpg",
    bgprofileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1657475293/cld-sample-2.jpg",
    Stories:[
      {
        _id:uuid(),
        url:"https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif",
        uploadedDate:new Date()
      },
      {
        _id:uuid(),
        url:"https://www.bhaktiphotos.com/wp-content/uploads/2018/04/Mahadev-Bhagwan-Photo-for-Devotee.jpg",
        uploadedDate:new Date(),
      },
    ],
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
  {
    _id: "wertyui345678",
		firstName: "Rahul",
		lastName: "Pant",
		username: "rahulpant@gmail.com",
		password: "rahul123",
		//
    profileImage:"https://res.cloudinary.com/dexubgbx0/image/upload/v1653736290/dan_o6nk9h.jpg",
    bgprofileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1658156152/nature-3082832__340_cl9yin.jpg",
    Intro: "A people loving government worker!",
    WorkAt:"TCS",
    HomeTown:"Kolkata",
    CurrentLocation:"Hyderabad",
    Position:"Senior test engineer",
    Education:"B.E",
    Birthdate:"1997/01/16",
    Hobbys:"Cricket",
    Stories:[
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658155498/whatsapp-status-15_geivlp.jpg",
        uploadedDate:new Date()
      }
    ],
    //
    createdAt: formatDate(),
		updatedAt: formatDate(),
  },
  {
    _id: "sdasdffghjk234",
    firstName: "Aniket",
    lastName: "Sharma",
    username: "aniketsharma@123",
    password: "aniketsharma@123",
    bgprofileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1658215213/Pune-win-isl_vmfsrr.jpg",
    profileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1658215279/soccer-player-man-isolated-picture-id544358500_eyrqqt.jpg",
    Intro:"Lifestyle || bike lover || Fitness || Travel",
    WorkAt:"",
    HomeTown:"Nepal",
    CurrentLocation:"USA",
    Position:"CEO",
    Education:"MBA",
    Birthdate:"1994/06/13",
    Hobbys:"Travel",
    Stories:[
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658156469/15972530_1200001933419523_8647348969165308733_o.png_xo70gs.png",
        uploadedDate:new Date()
      },
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658156488/15268015_1790755174586592_6892763857747596364_n.png_fq3yxb.png",
        uploadedDate:new Date()
      }
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "kjhgfdsauytr",
    firstName: "Himanshi",
    lastName: "Raja",
    username: "himanshiraja@123",
    password: "himanshiraja@123",
    bgprofileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1658204123/35568-1569222673-75dab9ec-e849-47c0-ac7a-96ff69dfbb92_naowuc.jpg",
    profileImage:"https://res.cloudinary.com/dexubgbx0/image/upload/v1652872677/28102735662_5773509d11_b_zpjwv0.webp",
    //
    Intro:"Aim for moon! You may hit a star!",
    WorkAt:"shubham jewellery Shop",
    HomeTown:"Akot",
    CurrentLocation:"Pune",
    Position:"Owner",
    Education:"MBA",
    Birthdate:"1998/12/12",
    Hobbys:"Food cooking and art and craft",
    Stories:[
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658157408/80268380_hasvil.jpg",
        uploadedDate:new Date()
      },
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658157353/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3_jufgcs.jpg",
        uploadedDate:new Date()
      },
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658157428/80284875_tkjou6.jpg",
        uploadedDate:new Date()
      }
    ],
    //
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "mnbvcxzoiuytre",
    firstName: "Ankita",
    lastName: "Lokhande",
    username: "ankitaLokahde@12",
    password: "ankitaLokahde@12",
    Intro:"Actress",
    WorkAt:"film, radio, and television",
    HomeTown:"Mumbai",
    CurrentLocation:"Mumbai",
    Position:"Actress",
    Education:"SSC failed",
    Birthdate:"1985/09/03",
    Hobbys:"Dancing",
    Stories:[
      {
        _id:uuid(),
        url:"https://res.cloudinary.com/chanchal12/image/upload/v1658158103/whatsapp-status-in-hindi-attitude_yerfuc.jpg",
        uploadedDate:new Date()
      }
    ],
    bgprofileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1658157959/msid-63158060_width-1200_height-900_resizemode-4_leybdd.jpg",
    profileImage:"https://res.cloudinary.com/chanchal12/image/upload/v1658157890/Anime-Girl-Profile-Picture_u00vet.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  }
];
