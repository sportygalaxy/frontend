import Select, { SingleValue, CSSObjectWithLabel } from "react-select";

export const selectFieldStyles = {
  control: (base: CSSObjectWithLabel, state: any): CSSObjectWithLabel => ({
    ...base,
    display: "flex",
    width: "100%",
    paddingInline: "24px",
    paddingBlock: "4px",
    margin: "0px",
    borderRadius: "10px",
    borderWidth: state.isFocused ? "2px" : "2px",
    borderColor: state.isFocused
      ? "#4A90E2"
      : state.isDisabled
      ? "#D1D5DB"
      : "#DEE2E6",
    backgroundColor: state.isDisabled ? "#F3F4F6" : "#FFFFFF",
    boxShadow: state.isFocused ? "0 0 0 2px #BFDBFE" : "none",
    //  transition: "border-color 0.2s, box-shadow 0.2s", // Smooth transition
    cursor: state.isDisabled ? "not-allowed" : "default",
  }),
  valueContainer: (
    base: CSSObjectWithLabel,
    props: any
  ): CSSObjectWithLabel => ({
    ...base,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0px",
    margin: "0px",
  }),
};
