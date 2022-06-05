import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { ProfileContext } from "contexts/profile/profile.context";
import { CardHeader } from "components/card-header/card-header";
import RadioGroup from "components/radio-group/radio-group";
import RadioCard from "components/radio-card/radio-card";
interface Props {
  deviceType: any;
  increment?: boolean;
}

const Payment = ({ deviceType, increment = false }: Props) => {
  const {
    state: { card },
    dispatch,
  } = useContext(ProfileContext);

  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id="selectPaymentText"
          defaultMessage="Select Payment Option"
        />
      </CardHeader>
      <RadioGroup
        items={card}
        component={(item: any) => (
          <RadioCard
            id={item.id}
            key={item.id}
            title={item.name}
            content={item.name}
            name="schedule"
            checked={item.type === "primary"}
            withActionButtons={false}
            onChange={() =>
              dispatch({
                type: "SET_PRIMARY_PAYMENT",
                payload: item.id.toString(),
              })
            }
          />
        )}
      />
    </>
  );
};

export default Payment;
