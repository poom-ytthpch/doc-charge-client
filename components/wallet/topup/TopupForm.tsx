"use client";
import { TopUpWalletMutation } from "@/gql/wallet";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/slices/alertSlice";
import { getBalanceByMobile, logout } from "@/store/slices/authSlice";
import { MutationTopUpArgs, TopUpResponse } from "@/types/gql";
import { useMutation } from "@apollo/client/react";
import { Button, Flex, Form, Input, InputNumber, Radio } from "antd";
import { useRouter } from "next/navigation";

type TopUpForm = {
  amount: string;
};

const TopUpForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm<TopUpForm>();

  const [topup] = useMutation<{ topUp: TopUpResponse }, MutationTopUpArgs>(
    TopUpWalletMutation,
    {
      onCompleted(data) {
        console.log("Topup response:", data);
        if (data.topUp.status) {
          dispatch(
            showAlert({
              type: "success",
              message: `Topup initiated successfully. Payment ID: ${data.topUp.paymentId}`,
            })
          );
          dispatch(getBalanceByMobile());
          form.resetFields();
          router.push("/wallet");
        } else {
          dispatch(
            showAlert({
              type: "error",
              message: data.topUp.message || "Topup failed",
            })
          );
        }
      },
      onError(error) {
        console.log({ error_name: error.message });
        if (error.message.includes("401")) {
          dispatch(logout());
          dispatch(showAlert({ type: "error", message: "Please login again" }));
          router.push("/login");
          return;
        }
        dispatch(showAlert({ type: "error", message: error.message }));
      },
    }
  );

  const handleTopUp = (values: TopUpForm) => {
    console.log(values);
    if (values.amount === undefined || Number(values.amount) < 20) {
      dispatch(
        showAlert({
          type: "error",
          message: "Amount must be at least 20 THB",
        })
      );
      return;
    }
    topup({
      variables: {
        input: {
          amount: Number(values.amount),
        },
      },
    });
  };

  return (
    <div className="rounded-2xl p-10 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-center font-semibold text-2xl mb-4">
        TopUp (Min 20 THB)
      </div>
      <Form form={form} title="Topup" onFinish={handleTopUp} layout="vertical">
        <Form.Item label="Select Amount" name="amount">
          <Flex vertical gap="middle">
            <Radio.Group block>
              <Radio.Button value={50}>50</Radio.Button>
              <Radio.Button value={100}>100</Radio.Button>
              <Radio.Button value={200}>200</Radio.Button>
            </Radio.Group>
            <Radio.Group block>
              <Radio.Button value={300}>300</Radio.Button>
              <Radio.Button value={500}>500</Radio.Button>
              <Radio.Button value={1000}>1000</Radio.Button>
            </Radio.Group>
          </Flex>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <InputNumber<string>
            style={{ width: "100%" }}
            min={"20"}
            step="0.01"
            stringMode
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Topup
          </Button>
          <Button
            onClick={() => router.push("/wallet")}
            danger
            type="primary"
            className="w-full mt-2"
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TopUpForm;
