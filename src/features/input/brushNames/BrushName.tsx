import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import RadioGroup from "components/radio-group/radio-group";
import RadioCard from "components/radio-card/radio-card";
import { Button } from "components/button/button";
import { handleModal } from "features/checkouts/checkout-modal";
import { ProfileContext } from "contexts/profile/profile.context";
import CreateOrUpdateBrushName from "components/brushName-card/brushName-card";
import { CardHeader } from "components/card-header/card-header";
import { ButtonGroup } from "components/button-group/button-group";
import { Box } from "components/box";
import { Plus } from "assets/icons/PlusMinus";
interface Props {
  increment?: boolean;
  flexStart?: boolean;
  icon?: boolean;
  buttonProps?: any;
}

const BrushName = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: "big",
    variant: "outlined",
    type: "button",
    className: "add-button",
  },
}: Props) => {
  const {
    state: { brushName },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async (item) => {
    dispatch({ type: "DELETE_BRUSH_NAME", payload: item.id });
  };
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage id="defaultMessage" defaultMessage="Brush Name" />
      </CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={brushName}
          component={(item: any) => (
            <RadioCard
              id={item.id}
              key={item.id}
              title={item.type}
              content={item.name}
              onChange={() => {
                console.log(item, "item");
              }}
              name="brushName"
              onEdit={() => handleModal(CreateOrUpdateBrushName, item)}
              onDelete={() => handleOnDelete(item)}
            />
          )}
          secondaryComponent={
            <Button
              {...buttonProps}
              onClick={() =>
                handleModal(CreateOrUpdateBrushName, "add-contact-modal")
              }
            >
              {icon && (
                <Box mr={2}>
                  <Plus width="10px" />
                </Box>
              )}
              <FormattedMessage
                id="defaultMessage"
                defaultMessage="Add Brush Name"
              />
            </Button>
          }
        />
      </ButtonGroup>
    </>
  );
};

export default BrushName;
