import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import CustomOTPInput from "./OtpInput";
import { useMutation } from "@apollo/client/react";
import {
  RegisterMutation,
  SendOTPMutation,
  VerifyOTPMutation,
} from "@/gql/auth";
import { login } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { showAlert } from "@/store/slices/alertSlice";
import {
  CommonResponse,
  MutationMobileRegisterArgs,
  MutationSendOtpArgs,
  SendOtpResponse,
} from "@/types/gql";
import OtpCountdown from "./OtpCountDown";

type FieldType = {
  mobile: string;
  pin: string;
  verifyPin?: string;
};

type Props = {
  isLogin?: boolean;
};

const MobileRegisterForm = ({ isLogin }: Props) => {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [state, setState] = useState("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otpChecked, setOtpChecked] = useState(false);
  const [otpRefID, setOtpRefID] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = ({ mobile, pin }: FieldType) => {
    return dispatch(login({ mobile, pin }));
  };

  const handleClearAll = () => {
    setOtp("");
    setIsOtpSent(false);
    setOtpRefID("");
    setOtpChecked(false);
    setMobile("");
    form.resetFields();
  };

  const [mobileRegister] = useMutation<
    { mobileRegister: CommonResponse },
    MutationMobileRegisterArgs
  >(RegisterMutation, {
    onCompleted(data) {
      if (data.mobileRegister.status === false) {
        handleClearAll();
        form.resetFields();
        dispatch(
          showAlert({
            type: "error",
            message: data.mobileRegister.message || "Registration failed",
          })
        );
        return;
      }
      handleClearAll;
      dispatch(
        showAlert({
          type: "success",
          message: "Registration successful. Please login.",
        })
      );
      router.push("/login");
    },
    onError(error) {
      dispatch(
        showAlert({
          type: "error",
          message: error.message || "Failed to register",
        })
      );
    },
  });

  const onFinish = async (values: FieldType) => {
    setMobile(values.mobile);
    if (otpChecked && !isLogin) {
      mobileRegister({
        variables: {
          input: { mobile: values.mobile, pin: values.pin },
        },
      });
      return;
    }
    if (!isLogin) {
      sendOTP({
        variables: { input: { mobile: values.mobile, purpose: "REGISTER" } },
      });
      return;
    }
    const res = await handleLogin({ mobile: values.mobile, pin: values.pin });

    const payload: any = (res as any)?.payload;
    if (payload?.data?.login?.status) {
      router.push("/");
    }
  };

  const [sendOTP] = useMutation<
    { sendOtp: SendOtpResponse },
    MutationSendOtpArgs
  >(SendOTPMutation, {
    variables: {
      input: { mobile: mobile, purpose: "REGISTER" },
    },
    onCompleted(data) {
      setIsOtpSent(true);
      setOtpRefID(data.sendOtp.refId ?? "");
      dispatch(
        showAlert({
          type: "info",
          message: `MOCK OTP sent to ${mobile} , OTP is ${data.sendOtp.otp} , RefID is ${data.sendOtp.refId}`,
        })
      );
    },
    onError(error) {
      dispatch(
        showAlert({
          type: "error",
          message: error.message || "Failed to send OTP",
        })
      );
    },
  });

  const [verifyOtp] = useMutation<{ verifyOtp: boolean }>(VerifyOTPMutation, {
    onCompleted(data) {
      if (!data.verifyOtp) {
        dispatch(
          showAlert({
            type: "error",
            message: "Invalid OTP, please try again",
          })
        );
        return;
      }
      setIsActive(false);
      setOtpChecked(true);

      form.setFieldsValue({ mobile: mobile });
      dispatch(
        showAlert({
          type: "success",
          message: "OTP verified successfully",
        })
      );
    },
    onError(error) {
      dispatch(
        showAlert({
          type: "error",
          message: error.message || "Failed to verify OTP",
        })
      );
    },
  });

  const onOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const onResendOtp = () => {
    setOtp("");
    setOtpRefID("");
    sendOTP({
      variables: { input: { mobile: mobile, purpose: "REGISTER" } },
    });
  };

  return (
    <>
      {isOtpSent && !otpChecked ? (
        <>
          <CustomOTPInput value={otp} refId={otpRefID} onChange={onOtpChange} />
          <OtpCountdown setActive={setIsActive} onResendOtp={onResendOtp} />
          {isActive && (
            <Button
              type="primary"
              onClick={() => {
                verifyOtp({
                  variables: {
                    input: {
                      mobile: mobile,
                      otp: otp,
                      refId: otpRefID,
                    },
                  },
                });
              }}
            >
              Verify OTP
            </Button>
          )}
        </>
      ) : (
        <div className="flex justify-center rounded-3xl p-10 shadow-lg backdrop-blur-md ">
          <Form
            name="basic"
            form={form}
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

            {(isLogin || otpChecked) && (
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

            {otpChecked && (
              <Form.Item<FieldType>
                label="Verify Pin"
                name="verifyPin"
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
                  {
                    validator(_, value) {
                      if (value && value !== form.getFieldValue("pin")) {
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      }
                      return Promise.resolve();
                    },
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
              {isLogin && "Login"}
              {!isLogin && !otpChecked && "Send OTP"}
              {otpChecked && "Register"}
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default MobileRegisterForm;
