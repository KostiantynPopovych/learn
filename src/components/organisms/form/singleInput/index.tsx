import { useForm, Controller } from 'react-hook-form';
import { memo, useCallback } from 'react';
import { SingleInputProps, SingleInputInitialValues } from './singleInput';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { FIELDS } from './config';
import './styles.module.scss';

const SingleInput = ({ onSubmit, initialValues }: SingleInputProps) => {
  const { handleSubmit, control } = useForm({ defaultValues: initialValues });

  const renderInput = useCallback(
    ({ field }) => (
      <Input
        {...field}
        addonAfter={
          <button type="submit">
            <ArrowRightOutlined />
          </button>
        }
      />
    ),
    [],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={FIELDS.INPUT.validationRules}
        name={FIELDS.INPUT.name as keyof SingleInputInitialValues}
        render={renderInput}
      />
    </form>
  );
};

export default memo(SingleInput);
