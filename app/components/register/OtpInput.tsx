import OtpInput from "react-otp-input";

type OTPInputProps = {
  value: string;
  onChange: (otp: string) => void;
};

const CustomOTPInput = ({ value, onChange }: OTPInputProps) => {
  return (
    <>
      <span className="text-2xl font-bold">Enter OTP</span>
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          fontSize: 24,
          borderRadius: 4,
          minWidth: 35,
          maxWidth: 50,
          maxHeight: 50,
          margin: "0 8px",
          border: "1px solid #ced4da",
        }}
      />
    </>
  );
};

export default CustomOTPInput;
