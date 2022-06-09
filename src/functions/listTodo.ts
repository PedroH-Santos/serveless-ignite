import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";

type ICreateNewTodo = {
    title: string;
    deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { userid } = event.pathParameters;
 
    console.log(userid);

    const response = await document.scan({
        TableName: "todo",
        FilterExpression: ':user_id = user_id',
        ExpressionAttributeValues: { ':user_id': userid, },
    }).promise();

    const userTodos = response.Items;
    if(userTodos){
        return {
            statusCode: 201,
            body: JSON.stringify({
                userTodos
            })
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Error ao listar usuarios"
        })
    }


}

