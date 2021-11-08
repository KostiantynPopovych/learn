import { memo } from 'react';
import SingleInputForm from 'components/organisms/form/singleInput';
import useLogin  from "./useLogin";
import sm from './styles.module.scss';
import Pulse from "components/atoms/puls";

const Login = () => {
  const {handleSubmitForm, isLoading} = useLogin();

  return (
    <div className={sm.Container}>
      <Pulse isVisible={isLoading} />
      <div className={sm.Container_Label}>
        <span>learn</span>
      </div>
      <div className={sm.Container_Input}>
        <SingleInputForm onSubmit={handleSubmitForm} />
      </div>
    </div>
  )
};

export default memo(Login);
