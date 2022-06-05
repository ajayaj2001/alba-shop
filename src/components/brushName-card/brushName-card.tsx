import React, { useContext } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import TextField from "components/forms/text-field";
import * as Yup from "yup";
import { closeModal } from "@redq/reuse-modal";
import { FormikProps, ErrorMessage, Formik, Form } from "formik";
import MaskedInput from "react-text-mask";
import { ProfileContext } from "contexts/profile/profile.context";
import { Button } from "components/button/button";
import { FieldWrapper, Heading } from "./brushName-card.style";
import { FormattedMessage } from "react-intl";

type Props = {
  item?: any | null;
};
// Shape of form values
type FormValues = {
  id?: number | null;
  type?: string;
  name?: string;
};

const BrushNameValidationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

const CreateOrUpdateBrushName: React.FC<Props> = ({ item }) => {
  const initialValues = {
    id: item.id || null,
    name: item.name || "",
  };
  const { state, dispatch } = useContext(ProfileContext);
  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    dispatch({ type: "ADD_OR_UPDATE_BRUSH_NAME", payload: values });
    closeModal();
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={BrushNameValidationSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        isSubmitting,
      }: FormikProps<FormValues>) => (
        <Form>
          <Heading>
            {item && item.id ? "Edit Brush Name" : "Add New Brush Name"}
          </Heading>
          <FieldWrapper>
            <TextField
              name="name"
              id="info"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FieldWrapper>
          <ErrorMessage name="name" component={StyledError} />

          <Button
            disabled={isSubmitting}
            type="submit"
            style={{ width: "100%", height: "44px" }}
          >
            <FormattedMessage id="defaultMessage" defaultMessage="Save Name" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrUpdateBrushName;

const StyledInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: ${themeGet("radii.base", "6px")};
  font-family: ${themeGet("fonts.body", "Lato, sans-serif")};
  border: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  font-size: 16px;
  line-height: 19px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  padding: 0 18px;
  box-sizing: border-box;
  transition: border-color 0.25s ease;

  &:hover,
  &:focus {
    outline: 0;
  }

  &:focus {
    border-color: ${themeGet("colors.primary.regular", "#009e7f")};
  }

  &::placeholder {
    color: ${themeGet("colors.text.regular", "#77798C")};
  }
`;

const StyledError = styled.div`
  color: red;
  padding-bottom: 10px;
  margin-top: -5px;
`;
