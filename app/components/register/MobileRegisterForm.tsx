import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import CustomOTPInput from "./OtpInput";
import OtpCountdown from "@/app/common/OtpCountDown";
import { useMutation } from "@apollo/client/react";
import { SendOTPMutation } from "@/app/gql/auth";

type FieldType = {
  mobile: string;
};

const MobileRegisterForm = () => {
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [state, setState] = useState("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otpChecked, setOtpChecked] = useState(false);
  const [otpRefID, setOtpRefID] = useState("");

  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    setMobile(values.mobile);
    setIsOtpSent(true);
    sendOTP({ variables: { input: { mobile: mobile, purpose: "REGISTER" } } });
  };

  const [sendOTP] = useMutation(SendOTPMutation, {
    variables: {
      input: { mobile: mobile, purpose: "REGISTER" },
    },
    onCompleted(data) {
      console.log("OTP sent successfully:", data);
      // setOtpRefID(data.sendOtp.refId);
    },
    onError(error) {
      console.error("Error sending OTP:", error);
    },
  });

  const onOtpChange = (otp: string) => {
    console.log("OTP Changed:", otp);
    setOtp(otp);
  };

  return (
    <>
      {isOtpSent ? (
        <>
          <CustomOTPInput value={otp} onChange={onOtpChange} />
          <OtpCountdown setActive={setIsActive} />
          {isActive && <Button>Verify OTP</Button>}
        </>
      ) : (
        <div className="w-full flex justify-center">
          <Form
            name="basic"
            // labelCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ maxWidth: 150 }}
          >
            <Form.Item<FieldType>
              label="MOBILE NUMBER"
              name="mobile"
              layout="vertical"
              rules={[
                { required: true, message: "Please input your mobile number!" },
                {
                  min: 10,
                  message: "Mobile number must be at least 10 digits.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Mobile number must contain only digits.",
                },
              ]}
            >
              <Input style={{ width: "150px" }} maxLength={10} minLength={10} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Send OTP
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default MobileRegisterForm;
