import { forwardRef, InputHTMLAttributes, useEffect } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorHandler?: (error: string) => void;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dirty?: boolean;
  value?: string;
};

function checkError(value: string | undefined, props: Props) {
  const number = !value?.trim() ? undefined : Number(value);
  if (Number.isNaN(number) || (props.required && !value?.trim())) {
    return "Insira um número";
  }
  if (props.maxLength && value && value.trim().length > props.maxLength) {
    return `O número deve ter ${props.maxLength} ou menos caracteres`;
  }
  if (props.min && number != undefined && number < Number(props.min)) {
    return `O número deve ser maior que ${props.min}`;
  }
  if (props.max && number != undefined && number > Number(props.max)) {
    return `O número deve ser menor que ${props.max}`;
  }
  return "";
}

const NumericInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const error = props.dirty ? checkError(props.value, props) : "";

  useEffect(() => {
    if (props.errorHandler) props.errorHandler(error);
  }, [error]);

  return (
    <input
      className={"input " + props.className}
      type="text"
      inputMode="numeric"
      maxLength={props.maxLength}
      min={props.min}
      max={props.max}
      placeholder="Número do hino"
      ref={ref}
      required={props.required}
      title="Insira apenas números"
      value={props.value}
      onChange={props.changeHandler}
    />
  );
});

export default NumericInput;
