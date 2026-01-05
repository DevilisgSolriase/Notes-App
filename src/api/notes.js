import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "eu-central-1" });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Notes";

export const handler = async (event) => {
  try {
    const claims = event.requestContext?.authorizer?.jwt?.claims;
    if (!claims?.sub) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const userId = claims.sub;
    const route = event.requestContext.routeKey;
    const body = event.body ? JSON.parse(event.body) : null;
    const noteId = event.pathParameters?.id;

    switch (route) {
      // GET /notes
      case "GET /notes": {
        const result = await ddb.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: "UserID = :uid",
            ExpressionAttributeValues: { ":uid": userId },
          })
        );
        return { statusCode: 200, body: JSON.stringify(result.Items || []) };
      }

      // GET /notes/{id}
      case "GET /notes/{id}": {
        const result = await ddb.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: "UserID = :uid AND NotesID = :nid",
            ExpressionAttributeValues: { ":uid": userId, ":nid": noteId },
          })
        );
        const item = result.Items?.[0];
        if (!item) {
          return { statusCode: 404, body: "Note not found" };
        }
        return { statusCode: 200, body: JSON.stringify(item) };
      }

      // POST /notes
      case "POST /notes": {
        const NotesID = crypto.randomUUID();

        await ddb.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: {
              UserID: userId,
              NotesID,
              title: body.title,
              content: body.content,
              createdAt: new Date().toISOString(),
            },
          })
        );

        return { statusCode: 201, body: JSON.stringify({ NotesID }) };
      }

      // PUT /notes/{id}
      case "PUT /notes/{id}": {
        await ddb.send(
          new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { UserID: userId, NotesID: noteId },
            UpdateExpression: "SET title = :t, content = :c",
            ExpressionAttributeValues: {
              ":t": body.title,
              ":c": body.content,
            },
          })
        );
        return { statusCode: 200, body: "Updated" };
      }

      // DELETE /notes/{id}
      case "DELETE /notes/{id}": {
        await ddb.send(
          new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { UserID: userId, NotesID: noteId },
          })
        );
        return { statusCode: 204 };
      }

      default:
        return { statusCode: 405, body: "Route not allowed" };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Internal server error" };
  }
};
