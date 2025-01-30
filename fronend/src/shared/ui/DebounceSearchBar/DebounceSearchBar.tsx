import { useDebounce } from "../../hooks";
import { FC, useEffect } from "react";
import { typography } from "@shared/consts";
import { Input, InputProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type DebounceSearchBarProps = {
  placeholder?: string;
  onChange: (value: string) => void;
  initialValue?: string;
} & Omit<InputProps, "onChange">;

const DebounceSearchBar: FC<DebounceSearchBarProps> = ({
  placeholder,
  onChange,
  initialValue,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useDebounce<string>(
    initialValue ?? "",
    300,
    (v) => {
      console.log("v", v);
      onChange(v);
    },
  );

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const handleChange = (val: string) => {
    console.log("val", val);
    setValue(val);
  };

  return (
    <Input
      placeholder={placeholder ?? typography.form.placeholder.input}
      onChange={(e) => handleChange(e.target.value)}
      prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      value={value}
      {...props}
    />
  );
};

export default DebounceSearchBar;
