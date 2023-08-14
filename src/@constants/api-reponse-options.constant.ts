import { ApiResponseOptions } from '@nestjs/swagger';

export const ApiResponseDetail = (code: number): ApiResponseOptions => {
  const detail: { [key: number]: ApiResponseOptions } = {
    200: {
      status: 200,
      description: 'The data has been successfully',
    },
    201: {
      status: 201,
      description: 'The record has been successfully created or updated.',
    },
  };

  const errorCode: ApiResponseOptions = {
    status: 500,
    description: '',
  };

  return detail[code] ? detail[code] : errorCode;
};
