import React, { useContext } from "react";
import { CardHeader } from "components/card-header/card-header";
import { FormattedMessage } from "react-intl";
import { Input } from "components/forms/input";
import { ProfileContext } from "contexts/profile/profile.context";

const NameInput = ({ inputTitle, inputName, inputType }) => {
  const { dispatch } = useContext(ProfileContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: "HANDLE_ON_INPUT_CHANGE",
      payload: { value, field: name },
    });
  };

  return (
    <>
      <CardHeader increment={true}>
        <FormattedMessage id="inputMessage" defaultMessage={inputTitle} />
      </CardHeader>
      <Input
        name={inputName}
        type={inputType}
        style={{ borderColor: "#009e7f" }}
        onChange={handleChange}
      />
    </>
  );
};

export default NameInput;
