export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  BAD_GATEWAY: 500,
} as const;

export const RESPONSE_CODE = {
  // MEMBER
  DUPLICATE_EMAIL: 1000,
  INVALID_REFRESH_TOKEN: 1001,
  UNAUTHORIZED: 1002,
  INCORRECT_EMAIL: 1003,
  INCORRECT_PASSWORD: 1004,
  NOT_FOUND_MEMBER: 1005,
  NOT_FOUND_AUTHENTICATION_INFO: 1006,
  INCORRECT_EMAIL_CODE: 1010,
  NOT_REGISTERED: 1011,

  // ACCOMMODATION
  NOT_FOUND_ACCOMMODATION_ID: 2000,

  // ROOM
  NOT_FOUND_ROOM_DATA: 3000,
  DUPLICATE_ROOM_NAME: 3001,

  // COUPON
  INVALID_COUPON: 5000,
  NON_FOUND_COUPON: 5001,

  // POINT
  TOSS_ERROR: 6000,
  POINT_PAYMENT_FAIL: 6001,
  REFUND_FAIL: 6002,
  NOT_FOUND_POINT: 6003,
  INSUFFICIENT_POINT_BALANCE: 6004,

  // COMMON
  DB_ERROR: 9000,
  REQUEST_BODY_ERROR: 9001,
  SERVER_ERROR: 9002,
  INVALID_DATE: 9003,
  NOT_ACCOMMODATION_OWNER: 9004,

  // IMAGE SAVE
  IMAGE_SAVE_FAIL: 2005,

  //ACCOMMODATION REGISTRATION
  INVALID_CATEGORY: 2002,
  EMPTY_ACCOMMODATION_IMAGES: 2003,
  EMPTY_ROOM_IMAGES: 3007,
  EMPTY_ROOM_INFO: 3006,
} as const;
