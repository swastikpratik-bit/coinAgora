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
      
      w={"container.lg"}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorCom;
