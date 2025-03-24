import { useCallback, useId } from "react";
import { twMerge } from "tailwind-merge";

export interface TextInputProps {
  //! 기본적인 컴포넌트 구성
  label: string;
  placeholder?: string;
  value: string | number;
  onChangeText: (value: string) => void;

  //! div label 추가 스타일링

  divClassName?: string;
  labelClassName?: string;
  //! input의 내용을 변경하고 싶을 떄 쓰면 되는 창구
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const useTextInput = () => {
  const id = useId();
  const Component = useCallback(
    ({
      label,
      onChangeText,
      value,
      placeholder,
      divClassName,
      labelClassName,
      props,
    }: TextInputProps) => {
      return (
        <div className={twMerge("col gap-y-1", divClassName)}>
          <label
            htmlFor={id}
            className={twMerge("text-gray text-sm", labelClassName)}
          >
            {label}
          </label>
          <input
            {...props}
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder={placeholder}
            className={twMerge(
              "border border-border bg-lightGray rounded h-1 px-2.5 focus:border-none focus:border-b focus:border-theme focus:rounded-none focus:bg-white outline-none foucs:border-l-0 foucs:border-r-0 trasition",
              props?.className
            )}
          />
        </div>
      );
    },
    [id]
  );

  return { Component };
};

export default useTextInput;
