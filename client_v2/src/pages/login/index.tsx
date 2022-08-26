import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { useRefreshTokenMutation } from "@/api/generatedTypes";
import { useEffect } from "react";

const Login = () => {
  const res = useRefreshTokenMutation({
    endpoint: "http://localhost:8000/graphql",
  });
  console.log(res.data?.refreshToken);
  useEffect(() => {
    res.mutate({});
  }, []);
  return <div>Login</div>;
};

export default Login;
