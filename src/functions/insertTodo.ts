import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient"; 
import { v4 as uuidV4 } from "uuid";

type ICreateNewTodo = {
    title: string;
    deadline: string; 
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { userid } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateNewTodo;

    console.log(userid);

    await document.put({
        TableName: "todo",
        Item: {
            id: uuidV4(),
            user_id: userid,
            title,
            done: false,
            deadline: new Date(deadline).toUTCString(),
        }
    }).promise();
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo create success",
            url: "",
        })
    }

}

