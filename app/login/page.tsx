import LoginForm from "@/app/login/LoginForm";
import Image from "next/image";
export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800 bg-gray-50">
      <div className="w-full py-12 sm:bg-white sm:shadow-xl sm:w-xl sm:rounded-xl">
        <div className="flex items-end justify-center w-full mb-12 mr-4">
          <Image
            src="/images/icons/logo_main.png"
            alt="logo"
            width={72}
            height={72}
          />
          <div className="flex flex-col ">
            <h2 className="text-xl font-bold text-sky-600">OSOGE LOGIN</h2>
            <p className=" text-sky-600">
              <span className="font-bold">어서오게</span>
              <span className="text-sm"> :접수시스템</span>
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
