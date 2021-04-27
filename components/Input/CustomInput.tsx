import React, { useRef } from 'react';
import { CustomInputBox } from './styles';

type CustomInputPropsType = {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  width?: number;
  type?: string;
};
export default function CustomInput({
  title,
  width = 0,
  value = '',
  onChange,
  type = 'text',
}: CustomInputPropsType): JSX.Element {
  const inputEl = useRef<null | HTMLInputElement>(null);
  return (
    <CustomInputBox width={width}>
      <div className="line"></div>
      {title && <span onClick={() => inputEl.current?.focus()}>{title}</span>}
      <input type={type} ref={inputEl} value={value} onChange={onChange} />
    </CustomInputBox>
  );
}
