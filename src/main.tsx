import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { UserProvider } from './context/UserContext.tsx';

const API_URL =
  import.meta.env.DEV
    ? import.meta.env.VITE_DEV_API_URL + "/api/graphql"
    : import.meta.env.VITE_PROD_API_URL + "/api/graphql";


const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <UserProvider>
      <App />
    </UserProvider>
  </ApolloProvider>,
)
