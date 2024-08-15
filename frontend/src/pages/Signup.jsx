import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomComponent } from "../components/BottomComponent";

function SignUp() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox label={"First Name"} placeholder={"John"} />
          <InputBox label={"Last Name"} placeholder={"Doe"} />
          <InputBox label={"Email"} placeholder={"vikrant@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div className="pt-4" >
          <Button label={"Sign up"} />
          </div>
          <BottomComponent label={"Already have an account?"} linkText={'Sign in'} to={'/signin'}  />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
