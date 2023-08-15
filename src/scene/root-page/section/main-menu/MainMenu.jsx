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
      {
        label: "Pay a Bill",
        key: "paybill-menu",
        children: [
          {
            label: "Pay a Bill",
            key: "/move-money/pay-bill",
          },
          {
            label: "Add payee",
            key: "/move-money/add-payee",
          },
          {
            label: "Upcoming payments",
            key: "/move-money/upcoming-payments",
          },
        ],
      },
      {
        label: "Send Money with Interac e-Transfer",
        key: "/move-money-interac-transfer",
      },
      {
        label: "Split Bill",
        key: "split-bill",
        children: [
          {
            label: "Split with Friends",
            key: "/move-money/split-bill",
          },
          {
            label: "Split Requests Histroy",
            key: "/move-money/split-request-history",
          },
          {
            label: "Requested Split",
            key: "/move-money/requested-split",
          },
        ],
      },
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
