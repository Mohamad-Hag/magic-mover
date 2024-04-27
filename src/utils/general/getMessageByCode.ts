import StatusCodes from "../../constants/statusCodes";

function getMessageByCode(code: number): string {
  let statusCode = StatusCodes.find((statusCode) => statusCode.code === code);
  return statusCode ? statusCode.message : "Status Code Message Not Found";
}

export default getMessageByCode;
