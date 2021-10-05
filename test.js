import * as uuid from "uuid";
import {AWS: { DynamoDB: DocumentClient }} from "aws-sdk";

const dynamoDb = new DocumentClient();

export async function main(event, context) {
  
  // Request body is passed in as a JSON encoded string in 'event.body'

  const data = JSON.parse(event.body);

  const params = {
      TableName: process.env.tableName,
      Item: {
       // The attributes of the item to be created
        userId: "123", // The id of the author
        noteId: uuid.v1(), // A unique uuid
        content: data.content, // Parsed from request body
        attachment: data.attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
     },
  };
  
 
