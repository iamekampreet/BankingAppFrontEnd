import { Alert, Button, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";

import "./styles.css";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import {
  getAccountLabel,
  getUserAndTokenFromStorage,
} from "../../../../utils/utils";

const InputSection = ({ setCurrentSection, setSplitInfo, splitInfo }) => {
  const [errorDescription, setErrorDescription] = useState();
  const [form] = Form.useForm();

  const { user } = getUserAndTokenFromStorage();

  const onFinishHandler = (values) => {
    console.log(values);
    if (!values.friendInfos) {
      setErrorDescription("Please provide friend info.");
      return;
    }

    setCurrentSection(`summary`);
    setSplitInfo(values);
  };

  const updateValues = (values) => {
    setSplitInfo(values);
  };

  console.log(`===${JSON.stringify(splitInfo)}`);

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
        onFinishFailed={onFinishHandler}
        onValuesChange={updateValues}
        form={form}
      >
        {errorDescription && (
          <Alert message={errorDescription} type="error" closable />
        )}
        <Form.Item
          label="How much would you like to split?"
          style={{}}
          name="amount"
          initialValue={splitInfo?.amount}
          rules={[
            {
              required: true,
              message: "Please provide amount.",
            },
          ]}
        >
          <Input placeholder="Input Amount" value="2" />
        </Form.Item>
        <Form.List
          name="friendInfos"
          initialValue={splitInfo?.friendInfos}
          rules={[
            {
              required: true,
              message: "Test",
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              <p style={{ "font-size": "20px" }}>Pick your friends</p>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    "justify-content": "space-between",
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing first name",
                      },
                    ]}
                    style={{
                      width: "250px",
                    }}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing last name",
                      },
                    ]}
                    style={{
                      width: "250px",
                    }}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "phoneNumber"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing phone number",
                      },
                    ]}
                    style={{
                      width: "250px",
                    }}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add a friend
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label="Deposit into"
          name="accountNumber"
          initialValue={splitInfo?.accountNumber}
          rules={[
            {
              required: true,
              message: "Please select account",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="To which account?"
            options={user.accounts.map((account) => {
              return {
                value: account.accountType,
                label: `${getAccountLabel(account.accountType)}
                  (#${account.accountNumber})`,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          label="Your email"
          name="userEmail"
          initialValue={splitInfo?.userEmail}
          rules={[
            {
              required: true,
              message: "Please provide email",
            },
          ]}
        >
          <Input placeholder="Input your email" />
        </Form.Item>
        <Form.Item label="Note" name="note" initialValue={splitInfo?.note}>
          <TextArea rows={4} placeholder="Add a note" />
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

export default InputSection;
