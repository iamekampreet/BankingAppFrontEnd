import { Alert, Button, DatePicker, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import dayjs from "dayjs";

import "./styles.css";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import {
  getAccountLabel,
  getUserAndTokenFromStorage,
} from "../../../../utils/utils";

const TransferBetweenAccountsInputSection = ({
  transferBetweenAccountsInfo,
  setTransferBetweenAccountsInfo,
  setCurrentSection,
}) => {
  const [errorDescription, setErrorDescription] = useState();
  const [form] = Form.useForm();

  const { user } = getUserAndTokenFromStorage();
  // console.log(user);

  const onFinishHandler = (values) => {
    console.log(values);

    setCurrentSection(`summary`);
    setTransferBetweenAccountsInfo(values);
  };

  const updateValues = (values) => {
    setTransferBetweenAccountsInfo(values);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < dayjs().startOf("day");
  };

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
          initialValue={transferBetweenAccountsInfo?.accountNumber}
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
          initialValue={transferBetweenAccountsInfo?.accountNumber}
          rules={[
            {
              required: true,
              message: "Please select 'to' account",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="To which account?"
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
          label="Amount"
          name="amount"
          initialValue={transferBetweenAccountsInfo?.amount}
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
          initialValue={transferBetweenAccountsInfo?.accountNumber}
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

export default TransferBetweenAccountsInputSection;
