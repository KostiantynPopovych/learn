import { useForm, Controller } from 'react-hook-form';
import {memo} from 'react';
import {LoginProps} from "./loginTypes";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Input} from "antd";
import {FIELDS} from "./config";

const Login = ({onSubmit}: LoginProps) => {
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

export default memo(Login);
