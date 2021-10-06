import * as uuid from "uuid";
import { DynamoDB: { DocmentClient } } from "aws-sdk";

const { v1 } = uuid;
let { stringify }  = JSON; 

const dynamoDb = new DocumentClient();
const { tableName } = process.env; 

export async function main(event, context) {
  
  // Request body is passed in as a JSON encoded string in 'event.body'

  const { content, attachment } = JSON.parse(event.body);

  const params = {
      TableName: tableName,
      Item: {
       // The attributes of the item to be created
        userId: "123", // The id of the author
        noteId: v1(), // A unique uuid
        content: content, // Parsed from request body
        attachment: attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
     },
  };
  
  let { Item } = params; 
  
  try {
    await dynamoDb.put(params).promise();
      return {
          statusCode: 200,
          body: stringify(Item),
       };
    } catch ({ message }) {
        return {
          statusCode: 500,
          body: stringify({ error: message }),
        };
     }
}
 
