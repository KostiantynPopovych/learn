import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "@/pages/login";

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <LoginPage />
  </QueryClientProvider>
);

export default Root;
