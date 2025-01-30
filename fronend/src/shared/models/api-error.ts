export type ApiPropertyError = {
  statusCode: number;
  message: {
    property: string;
    message: string;
  }[];
};

export type ApiNotFoundError = {
  statusCode: number;
  message: string;
};
