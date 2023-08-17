import { useContext, useEffect, useState } from "react";
import DetailRow from "./components/detail-row";
import "./styles.css";
import { Button, Form, Input, Modal } from "antd";
import { MyAppContext } from "../../provider/MyAppProvider";
import { useNavigate } from "react-router-dom";
import {
  clearUserAndTokenFromStorage,
  getUserAndTokenFromStorage,
  updateUserInStorage,
} from "../../utils/utils";

const AddPayeeScene = () => {
  const [payeeList, setPayeeList] = useState();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [description, setDescription] = useState();
  const [selectedPayeeInfo, setSelectedPayeeInfo] = useState();

  const { messageApi } = useContext(MyAppContext);
  const navigate = useNavigate();

  const fetchPayeeList = async () => {
    try {
      const { token } = getUserAndTokenFromStorage();
      console.log(process.env.REACT_APP_PAY_BILL_ALL_PAYEE, token);
      const response = await fetch(
        `${process.env.REACT_APP_PAY_BILL_ALL_PAYEE}`,
        {
          method: `GET`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonResponse = await response.json();
      if (response.ok) {
        setPayeeList(jsonResponse);
      } else {
        messageApi.info(jsonResponse.message);
      }
      if (response.status === 401) {
        clearUserAndTokenFromStorage();
        navigate("/auth");
      }
    } catch (ex) {
      console.log("=====");
      console.log(ex);
      messageApi.info(ex.message);
    }
  };

  const updateUserPayee = async () => {
    const requestbody = {
      payeeId: selectedPayeeInfo.payeeId,
      displayName: selectedPayeeInfo.displayName,
      description: description,
      accountNumber: selectedPayeeInfo.accountNumber,
    };

    try {
      const { token } = getUserAndTokenFromStorage();
      console.log(process.env.REACT_APP_PAY_BILL_UPDATE_USER_PAYEE, token);
      const response = await fetch(
        `${process.env.REACT_APP_PAY_BILL_UPDATE_USER_PAYEE}`,
        {
          method: `POST`,
          body: JSON.stringify(requestbody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonResponse = await response.json();
      if (response.ok) {
        console.log(jsonResponse);
        messageApi.info("Payee Added to list");
        updateUserInStorage(jsonResponse);
        //setPayeeList(jsonResponse);
      } else {
        messageApi.info(jsonResponse.message);
      }
      if (response.status === 401) {
        clearUserAndTokenFromStorage();
        navigate("/auth");
      }
      setIsModelOpen(false);
    } catch (ex) {
      console.log("=====");
      console.log(ex);
      messageApi.info(ex.message);
    }
  };

  useEffect(() => {
    fetchPayeeList();
  }, []);

  const handleModalOkClick = (e) => {
    e.stopPropagation();
    console.log("Updating payee");
    updateUserPayee();
  };

  const openModal = (payee) => {
    setModalTitle(`Add ${payee.displayName} as a payee?`);
    setIsModelOpen(true);
    setSelectedPayeeInfo(payee);
  };

  console.log("-----");
  console.log(payeeList);

  return (
    <div className="add-payee">
      <h2>Payee List</h2>
      {payeeList?.map((payee) => (
        <DetailRow {...payee} openModal={openModal} />
      ))}
      <Modal
        title={modalTitle}
        open={isModelOpen}
        onOk={handleModalOkClick}
        onCancel={(e) => {
          e.stopPropagation();
          setIsModelOpen(false);
        }}
        footer={null}
      >
        <Form
          name="basic"
          style={{
            maxWidth: "100%",
            marginTop: "16px",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item label="Add description" name="description">
            <Input onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleModalOkClick}
            >
              Add payee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPayeeScene;
