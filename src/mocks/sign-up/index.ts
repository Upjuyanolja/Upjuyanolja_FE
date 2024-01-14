import { HttpResponse } from 'msw';
import signUpData from '@assets/data/signUpData.json';
import requestAuthenticationData from '@assets/data/requestAuthenticationData.json';
import verifyAuthenticationData from '@assets/data/verifyAuthenticationData.json';
export const postSignUpResolver = async () => {
  return HttpResponse.json(signUpData, { status: 200 });
};
export const postAuthenticationResolver = async () => {
  return HttpResponse.json(requestAuthenticationData, { status: 200 });
};
export const getVerifyResolver = async () => {
  return HttpResponse.json(verifyAuthenticationData, { status: 200 });
};
