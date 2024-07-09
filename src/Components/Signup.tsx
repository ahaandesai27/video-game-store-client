import { FormEvent, useRef } from "react";
import { gql, useMutation } from "@apollo/client"

interface signupData {
    username: string|undefined, 
    email: string|undefined,
    password: string|undefined,     //needs to bcrypt
    firstName: string|undefined,
    lastName: string|undefined,
    age: number|undefined
}

interface SignupResponse {
    addUser: {
        _id: string,
        username: string
    }
}

const SIGN_UP = gql`
  mutation Mutation($user: AddUserInput!) {
    addUser(user: $user) {
      _id,
      username
    }
  }
`;

export default function Component() {
    const fnameRef = useRef<HTMLInputElement>(null);
    const lnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);

    const [signup, {data}] = useMutation<SignupResponse>(SIGN_UP);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        let userAge: number | undefined;
        if (ageRef.current?.value) {
          userAge = parseInt(ageRef.current?.value, 10);
        }
        const user: signupData = {
            username: usernameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            firstName: fnameRef.current?.value,
            lastName: lnameRef.current?.value,
            age: userAge
        }
        console.log(user);
        await signup({variables: {user}})
        //finally fixed :pray:
        if (data) {
          console.log(data);
          alert("Signed up successfully!");
        }
      } catch (error: any) {
        console.log(error); 
      }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center pt-12">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6 p-10 rounded-lg border border-gray-500
          relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg" onSubmit={handleSubmit}>
            <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white ">
                    Create an Account
                </h2>
            </div>

            <div className="flex space-x-4 justify-center w-full">
              <div className="flex-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                    First Name
                </label>
                <input
                  id="firstname" name="firstname" required placeholder="First Name" ref={fnameRef}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  

              <div className="flex-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                    Last Name
                </label>
                <input
                  id="lastname" name="lastname" required placeholder="Last Name" ref={lnameRef}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  

              <div className="flex-1">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                    Age
                </label>
                <input
                  id="age" name="age" type="number" required placeholder="Age" ref={ageRef}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>  
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username" name="username" required placeholder="Enter username" ref={usernameRef} type="text" autoComplete="username"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>    
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email" name="email" required placeholder="Enter email" ref={emailRef} type="email"
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  id="password" name="password" type="password" required autoComplete="current-password" placeholder="Enter password" ref={passwordRef}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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