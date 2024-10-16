import { FormEvent, useRef, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { onTokenChange, emitTokenChange } from "../../utils/eventEmitter"
import ErrorModal from "./ErrorModal"
interface AuthPayLoadData {
    loginUser: {
      token: string,
      user: {
          username: string,
          email: string
      }
    }
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token,
      user {
        username
        email
      }
    }
}
`
export default function Login() {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const [login] = useMutation<AuthPayLoadData>(LOGIN);
    const [loginError, setLoginError] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (formRef.current) {
          const formData = new FormData(formRef.current);
          const formValues = Object.fromEntries(formData.entries());
          console.log(formValues);
          const {data} = await login({
            variables: {
              ...formValues
            }
          });
          console.log(data);
          if (data && data.loginUser.token) {
            localStorage.setItem('token', data.loginUser.token);
            emitTokenChange(data.loginUser.token);
            navigate('/');
          }
        }
      } catch (error: any) {
        alert(error.message);
      } 
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center pt-12">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6 p-10 rounded-lg border border-gray-500 relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg" onSubmit={handleSubmit} ref={formRef}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white   ">
                    Login to your account
                </h2>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  type="email"
                  placeholder="Enter username or email  "
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>    
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>

            <div className="text-md text-center">
                <span className="text-white font-semibold">Don't have an account? </span>
                <a href="/signup" className="font-semibold text-purple-600 hover:text-indigo-500">Sign up</a>
            </div>
          </form>

        </div>
        <ErrorModal
          show = {loginError}
          handleClose={() => setLoginError(false)}
          errorMessage="Login Unsuccessful!"
        />
      </div>
    )
}