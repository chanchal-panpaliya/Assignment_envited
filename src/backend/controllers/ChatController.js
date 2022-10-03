import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

//get chat data
export const getChatHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: [
              "The username you entered is not Registered. Not Found error",
            ],
          }
        );
      }
    //    console.log(this.db.chats)
      return new Response(200, {}, { chats : this.db.chats });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
};

//get single chat
export const getUserChatHandler = function (schema, request) {
    const user = requiresAuth.call(this, request);
    const { username } = request.params;

    try {
      if (!user) {
        return new Response(
          404,
          {},
          {
            errors: [
              "The username you entered is not Registered. Not Found error",
            ],
          }
        );
      }
    let data = this.db.chats;
    let filterdata = data.filter((item)=>item.sender===username || item.receiver===username)
      return new Response(200, {}, { chats : filterdata });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
};

//add chat 
export const AddChatHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  const { postData } = JSON.parse(request.requestBody);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
   
 
  this.db.chats.insert(postData)
  let data = this.db.chats
  let filterdata = data.filter((item)=>item.sender===postData.receiver || item.receiver===postData.receiver)

    return new Response(201, {}, { chats: filterdata });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

//edit

//delete
