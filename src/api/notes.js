import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
  UpdateItemCommand,
  DeleteItemCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });

const TABLE = "Notes";

export const handler = async (event) => {
  const userId = event.requestContext.authorizer.jwt.claims.sub;
  const method = event.httpMethod;
  const noteId = event.pathParameters?.id;

  try {
    if (method === "GET") {
      if (noteId) {
        // Get single note
        const data = await client.send(new GetItemCommand({
          TableName: TABLE,
          Key: { UserID: { S: userId }, noteId: { S: noteId } }
        }));
        return ok(data.Item);
      } else {
        // List all notes
        const data = await client.send(new QueryCommand({
          TableName: TABLE,
          KeyConditionExpression: "UserID = :uid",
          ExpressionAttributeValues: { ":uid": { S: userId } }
        }));
        return ok(data.Items);
      }
    }

    if (method === "POST") {
      const body = JSON.parse(event.body);
      const noteId = crypto.randomUUID();
      const item = {
        UserID: { S: userId },
        noteId: { S: noteId },
        title: { S: body.title },
        content: { S: body.content },
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() }
      };

      await client.send(new PutItemCommand({ TableName: TABLE, Item: item }));
      return ok({ noteId, ...body });
    }

    if (method === "PUT") {
      const body = JSON.parse(event.body);
      await client.send(new UpdateItemCommand({
        TableName: TABLE,
        Key: { UserID: { S: userId }, noteId: { S: noteId } },
        UpdateExpression: "SET title=:t, content=:c, updatedAt=:u",
        ExpressionAttributeValues: {
          ":t": { S: body.title },
          ":c": { S: body.content },
          ":u": { S: new Date().toISOString() }
        }
      }));
      return ok();
    }

    if (method === "DELETE") {
      await client.send(new DeleteItemCommand({
        TableName: TABLE,
        Key: { UserID: { S: userId }, noteId: { S: noteId } }
      }));
      return ok();
    }

    return bad("Unsupported method");

  } catch (err) {
    return bad(err.message);
  }
};

const ok = (body = null) => ({
  statusCode: 200,
  headers: cors(),
  body: body ? JSON.stringify(body) : null
});

const bad = (msg) => ({
  statusCode: 400,
  headers: cors(),
  body: JSON.stringify({ error: msg })
});

const cors = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
});
