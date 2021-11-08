import { useForm, Controller } from 'react-hook-form';
import {memo} from 'react';
import {SingleInputProps} from "./singleInput";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Input} from "antd";
import {FIELDS} from "./config";

const SingleInput = ({onSubmit}: SingleInputProps) => {
  const { handleSubmit, control, } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={FIELDS.INPUT.name}
        render={({ field }) =>
          <Input
            {...field}
            addonAfter={
              <button type="submit">
                <ArrowRightOutlined />
              </button>
            }
          />}
      />
    </form>
  )
};

export default memo(SingleInput);
