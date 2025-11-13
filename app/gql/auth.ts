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
