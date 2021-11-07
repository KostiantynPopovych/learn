import {useContext, useMemo} from "react";
import {GlobalDataContext} from "context/global";

const useHome = () => {
  const { isLoading } = useContext(GlobalDataContext);

  return useMemo(() => ({
    isLoading
  }), [isLoading]);
};

export default useHome;
