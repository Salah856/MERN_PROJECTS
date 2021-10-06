import * as uuid from "uuid";
import { DynamoDB: { DocmentClient } } from "aws-sdk";

const { v1 } = uuid;
let { stringify, parse }  = JSON; 

const dynamoDb = new DocumentClient();
const { tableName } = process.env; 

export async function main({ body }, context) {
  
  const { content, attachment } = parse(body);

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
 
