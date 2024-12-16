import { FormEvent, useRef } from "react";
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom";
import { emitTokenChange } from "../../utils/eventEmitter"
interface SignupData {
  username?: string; 
  email?: string;
  password?: string; 
  firstName?: string;
  lastName?: string;
  age?: number;
}

interface AuthPayLoadData {
  registerUser: {
    token: string,
  }
  loginUser: {
    token: string,
    user: {
      username: string,
      email: string
    }
  }
}

const SIGN_UP = gql`
  mutation Mutation($user: AddUserInput!) {
    registerUser(user: $user) {
      token
    }
  }
`;

export default function Component() {
    const formRef = useRef<HTMLFormElement>(null);
    const [signup] = useMutation<AuthPayLoadData>(SIGN_UP);
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (formRef.current) {
          const formData = new FormData(formRef.current);
          let formValues: SignupData = Object.fromEntries(formData.entries()) as unknown as SignupData;
          if (formValues.age) {formValues.age = parseInt(formValues.age as unknown as string, 10);}
          
          const {data} = await signup({
            variables: {
              user: formValues
            }
          });
          if (data && data.registerUser.token) {
            localStorage.setItem('token', data.registerUser.token);
            emitTokenChange(data.loginUser.token);
            navigate('/');
          }
        }
      } catch (error: any) {
        alert("An error occured");
        console.log(error); 
      }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center pt-12">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6 p-10 rounded-lg border border-gray-500 relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg" ref = {formRef} onSubmit={handleSubmit}>
            <div>
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white ">
                    Create an Account
                </h1>
            </div>

            <div className="flex space-x-4 justify-center w-full">
              <div className="flex-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                    First Name
                </label>
                <input
                  id="firstname" name="firstName" required placeholder="First Name"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  

              <div className="flex-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                    Last Name
                </label>
                <input
                  id="lastname" name="lastName" required placeholder="Last Name"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  

              <div className="flex-1">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                    Age
                </label>
                <input
                  id="age" name="age" type="number" required placeholder="Age"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username" name="username" required placeholder="Enter username" type="text" autoComplete="username"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>    
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email" name="email" required placeholder="Enter email" type="email"
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
                  id="password" name="password" type="password" required autoComplete="current-password" placeholder="Enter password"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>

            <div className="text-md text-center">
                <span className="text-white font-semibold">Already have an account? </span>
                <a href="/login" className="font-semibold text-purple-600 hover:text-indigo-500">Log in</a>
            </div>
          </form>

        </div>
      </div>
    )
}