import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomComponent } from "../components/BottomComponent";

export default function SingIn() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
          <InputBox label={"Password"} placeholder={""} />
          <div className="pt-4">
            <Button label={"Sign In"} />
          </div>
          <BottomComponent
            label={"Don't have an account?"}
            linkText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
