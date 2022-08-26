export interface SingleInputInitialValues {
  input: string;
}

export interface SingleInputProps {
  onSubmit: (values: SingleInputValues) => void;
  initialValues?: SingleInputInitialValues;
}

export interface SingleInputValues {
  input?: string;
}
