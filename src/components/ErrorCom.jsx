import { Alert, AlertIcon } from "@chakra-ui/alert";
import React from "react";

const ErrorCom = ({ message }) => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      bottom={"4"}
      left={"50%"}
      transform={"translateX(-50%)"}
      
      w={"60vw"}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorCom;
