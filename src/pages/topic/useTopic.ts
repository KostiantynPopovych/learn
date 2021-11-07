import {useContext, useMemo} from "react";
import {GlobalDataContext} from "context/global";

const useTopic = () => {
  const { isLoading } = useContext(GlobalDataContext);

  return useMemo(() => ({
    isLoading
  }), [isLoading]);
};

export default useTopic;
