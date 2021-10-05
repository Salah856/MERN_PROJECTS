import * as uuid from "uuid";
import { DynamoDB } from "aws-sdk";

const { v1 } = uuid;
const { DocumentClient } = DynamoDB; 
let { stringify }  = JSON; 
const dynamoDb = new DocumentClient();


export async function main(event, context) {
  
  // Request body is passed in as a JSON encoded string in 'event.body'

  const data = JSON.parse(event.body);

  const params = {
      TableName: process.env.tableName,
      Item: {
       // The attributes of the item to be created
        userId: "123", // The id of the author
        noteId: v1(), // A unique uuid
        content: data.content, // Parsed from request body
        attachment: data.attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
     },
  };
  
  try {
    let { Item } = params; 
    await dynamoDb.put(params).promise();
      return {
          statusCode: 200,
          body: stringify(Item),
       };
    } catch (e) {
        return {
          statusCode: 500,
          body: stringify({ error: e.message }),
        };
     }
}
 
