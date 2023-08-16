import { Alert, Button, DatePicker, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import dayjs from "dayjs";

import "./styles.css";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import { getAccountLabel } from "../../../../utils/utils";

const PayBillInputSection = ({
  payBillInfo,
  setPayBillInfo,
  setCurrentSection,
}) => {
  const [errorDescription, setErrorDescription] = useState();
  const [form] = Form.useForm();

  const { user } = useContext(MyAppContext);
  // console.log(user);

  const onFinishHandler = (values) => {
    console.log(values);

    setCurrentSection(`summary`);
    setPayBillInfo(values);
  };

  const updateValues = (values) => {
    setPayBillInfo(values);
  };

  // const onErrorAlertCloseHandler = () => {
  //   setErrorDescription(null)
  // }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < dayjs().startOf("day");
  };

  // console.log(`===${JSON.stringify(payBillInfo)}`);

  return (
    <>
      <Form
        className="split-bill-form"
        layout={"vertical"}
        style={{
          maxWidth: 800,
        }}
        size={"large"}
        onFinish={onFinishHandler}
        onValuesChange={updateValues}
        form={form}
      >
        {errorDescription && (
          <Alert message={errorDescription} type="error" closable />
        )}
        <Form.Item
          label="From"
          name="from"
          initialValue={payBillInfo?.accountNumber}
          rules={[
            {
              required: true,
              message: "Please select 'from' account",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="From which account?"
            options={user.accounts.map((account) => {
              const displayStr = `${getAccountLabel(account.accountType)} - (#${
                account.accountNumber
              })`;
              return {
                value: JSON.stringify({
                  displayStr: displayStr,
                  accountNumber: account.accountNumber,
                }),
                label: displayStr,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          label="To"
          name="to"
          initialValue={payBillInfo?.accountNumber}
          rules={[
            {
              required: true,
              message: "Please select 'to' account",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="To which payee?"
            options={user.payee.map((payee) => {
              return {
                value: JSON.stringify({
                  payeeId: payee.payeeId,
                  accountNumber: payee.accountNumber,
                  displayName: payee.displayName,
                }).trim(),
                label: `${payee.displayName} - [${payee.description}]`,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          initialValue={payBillInfo?.amount}
          rules={[
            {
              required: true,
              message: "Please provide amount.",
            },
          ]}
        >
          <Input placeholder="Input Amount" value="2" />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select date",
            },
          ]}
        >
          <DatePicker
            style={{
              width: "100%",
            }}
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          label="Frequency"
          name="frequency"
          initialValue={payBillInfo?.accountNumber}
          rules={[
            {
              required: true,
              message: "Please select frequency",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Frequency?"
            options={[
              { value: 0, label: `Once` },
              { value: 1, label: `Weekly` },
              { value: 2, label: `Monthly` },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PayBillInputSection;
