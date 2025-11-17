import { gql } from "@apollo/client";

export const SendOTPMutation = gql`
  mutation Mutation($input: SendOtpInput!) {
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
