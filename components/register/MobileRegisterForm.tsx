import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import CustomOTPInput from "./OtpInput";
import { useMutation } from "@apollo/client/react";
import { SendOTPMutation } from "@/gql/auth";
import OtpCountdown from "@/common/OtpCountDown";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";

type FieldType = {
  mobile: string;
  pin: string;
};

type Props = {
  isLogin?: boolean;
};

const MobileRegisterForm = ({ isLogin }: Props) => {
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [state, setState] = useState("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otpChecked, setOtpChecked] = useState(false);
  const [otpRefID, setOtpRefID] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = ({ mobile, pin }: FieldType) => {
    dispatch(login({ mobile, pin }));
  };

  const onFinish = async (values: FieldType) => {
    console.log("Success:", values);
    setMobile(values.mobile);
    if (!isLogin) {
      setIsOtpSent(true);
      sendOTP({
        variables: { input: { mobile: mobile, purpose: "REGISTER" } },
      });
    }
    const res = await handleLogin({ mobile: values.mobile, pin: values.pin });

    console.log({ res });
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
        <div className="flex justify-center rounded-3xl p-20 shadow-lg backdrop-blur-md">
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

            {isLogin && (
              <Form.Item<FieldType>
                label="Pin"
                name="pin"
                layout="vertical"
                rules={[
                  { required: true, message: "Please fill pin!" },
                  {
                    len: 4,
                    min: 4,
                    max: 4,
                    message: "Password must be 4 characters.",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Password must contain only digits.",
                  },
                ]}
              >
                <Input.Password
                  style={{ width: "150px" }}
                  minLength={4}
                  maxLength={4}
                />
              </Form.Item>
            )}

            <Button type="primary" htmlType="submit" className="w-full">
              {isLogin ? "Login" : "Send OTP"}
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default MobileRegisterForm;
