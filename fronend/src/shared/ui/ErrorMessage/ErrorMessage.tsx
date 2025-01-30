import { FC } from "react";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div className="text-red-500 mt-2">{message}</div>;
};

export default ErrorMessage;
