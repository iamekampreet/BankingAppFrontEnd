import { useContext } from "react";

import { MyAppContext } from "../../provider/MyAppProvider";
import { getAccountLabel, getCardLabel } from "../../utils/utils";

import "./styles.css";

const AccountSummaryScene = () => {
  const { user } = useContext(MyAppContext);

  console.log(user);

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
