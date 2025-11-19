import { gql } from "@apollo/client";

export const SendOTPMutation = gql`
  mutation SendOtp($input: SendOtpInput!) {
    sendOtp(input: $input) {
      expiredAt
      otp
      refId
    }
  }
`;

export const VerifyOTPMutation = gql`
  mutation VerifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input)
  }
`;

export const LoginMutation = gql`
  mutation Mutation($input: LoginRequest!) {
    login(input: $input) {
      status
      message
      token
    }
  }
`;

export const RegisterMutation = gql`
  mutation MobileRegister($input: MobileRegisterRequest!) {
    mobileRegister(input: $input) {
      status
      message
    }
  }
`;
