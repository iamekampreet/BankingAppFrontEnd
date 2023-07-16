import Button from "../../../button";
import "./styles.css";

const Container = () => {
  return (
    <>
      <div className="move-money-flex">
        <Button
          color="primary"
          title="Transfer Between My Accounts"
          icon="transfer_between_my_accounts_icon.svg"
        />
        <Button color="primary" title="Pay a Bill" icon="pay_a_bill_icon.svg" />
        <Button
          color="primary"
          title="Send Money with Interac e-Transfer"
          icon="send_money_with_interac_e_transfer_icon.svg"
        />
        <Button
          color="primary"
          title="Split with Friends"
          icon="split_with_friends_icon.svg"
        />
      </div>
    </>
  );
};

export default Container;
