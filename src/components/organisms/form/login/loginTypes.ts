export interface LoginProps {
  onSubmit: (values: LoginValues) => void;
}

export interface LoginValues {
  input?: string
}
