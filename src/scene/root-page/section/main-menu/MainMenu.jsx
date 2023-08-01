import { Menu } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Accounts Summary", key: "/" },
  {
    label: "Move Money",
    key: "move-money",
    children: [
      {
        label: "Transfer Between My Accounts",
        key: "/move-money/transfer-between-account",
      },
      { label: "Pay a Bill", key: "/move-money/pay-bill" },
      {
        label: "Send Money with Interac e-Transfer",
        key: "/move-money-interac-transfer",
      },
      { label: "Split with Friends", key: "/move-money/split-bill" },
    ],
  },
  {
    label: "Profile & Account Settings",
    key: "/settings",
  },
];

const MainMenu = () => {
  const navigate = useNavigate();

  const onMenuItemClick = ({ key }) => {
    // console.log(`clicked ${key}`);
    // setCurrentPageName(keyLabelMap[key]);
    navigate(key);
  };

  return (
    <nav>
      <Menu
        style={{ width: 320, height: "100%" }}
        mode="inline"
        items={items}
        onClick={onMenuItemClick}
        defaultOpenKeys={["move-money"]}
      />
    </nav>
  );
};

export default MainMenu;
