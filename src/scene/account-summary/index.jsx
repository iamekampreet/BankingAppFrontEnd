import { useContext, useEffect, useState } from "react";

import { MyAppContext } from "../../provider/MyAppProvider";
import {
  getAccountLabel,
  getCardLabel,
  getUserAndTokenFromStorage,
} from "../../utils/utils";
import {
  clearUserAndTokenFromStorage,
  updateUserInStorage,
} from "../../utils/utils";

import "./styles.css";
import { useNavigate } from "react-router-dom";

const AccountSummaryScene = () => {
  const [refresh, setRefresh] = useState();
  let { user } = getUserAndTokenFromStorage();
  const { messageApi } = useContext(MyAppContext);
  const navigate = useNavigate();

  const updateUser = async () => {
    const { token } = getUserAndTokenFromStorage();
    try {
      console.log(process.env.REACT_APP_USER_INFO, token);
      const response = await fetch(`${process.env.REACT_APP_USER_INFO}`, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      console.log("In root page", jsonResponse);
      if (response.ok) {
        console.log("Updaing");
        updateUserInStorage(jsonResponse.user);
        setRefresh(!refresh);
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

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div id="accountSummaryMainContainer">
      <h3 id="bankAccountsHeading">Bank Accounts:</h3>
      <div className="totalContainerAccSum">
        <span className="totalLabelAccSum">Total: </span>
        <span className="totalValAccSum">
          $
          {user.accounts.reduce(
            (acc, { accountBalance }) => acc + accountBalance,
            0
          )}
          {" CAD"}
        </span>
      </div>
      <hr className="h3Underline" />

      <div id="bankAccountsContainer">
        {user.accounts.map((account) => (
          <>
            <div className="accountTypeContainerAccSum">
              <h4 className="accountTypeLblAccSum">
                {getAccountLabel(account.accountType)}
              </h4>
              <span className="accountNumberValAccSum">
                {account.accountNumber}
              </span>
              <span className="accountBalanceValAccSum">
                $ {account.accountBalance} CAD
              </span>
            </div>
            <hr className="h3UnderlineAccountType" />
          </>
        ))}
      </div>

      <h3 id="cardsHeading">Cards:</h3>
      <div className="totalContainerAccSum">
        <span className="totalLabelAccSum">Total: </span>
        <span className="totalValAccSum">
          $
          {user.cards.reduce(
            (acc, { accountBalance }) => acc + (accountBalance || 0),
            0
          )}
          {" CAD"}
        </span>
      </div>
      <hr className="h3Underline" />

      <div id="cardsContainer">
        {user.cards
          .filter((card) => card.accountBalance)
          .map((card) => (
            <>
              <div className="accountTypeContainerAccSum">
                <h4 className="accountTypeLblAccSum">
                  {getCardLabel(card.cardType)} CARD
                </h4>
                <span className="accountNumberValAccSum">
                  {card.cardNumber}
                </span>
                <span className="accountBalanceValAccSum">
                  $ {card.accountBalance} CAD
                </span>
              </div>
              <hr className="h3UnderlineAccountType" />
            </>
          ))}
      </div>
    </div>
  );
};

export default AccountSummaryScene;
