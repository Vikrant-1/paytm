import { useState } from "react";
import { TextInput } from "../components/TextInput";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-red">
      <div className="">
        <h1>Sign Up</h1>
        <p>Enter your information to create a account</p>
      </div>
      <form>
        <TextInput
          value={firstName}
          onValueChange={setFirstName}
          placeHolder={"Enter First Name"}
          title={"First Name"}
        />
        <TextInput
          value={lastName}
          onValueChange={setLastName}
          placeHolder={"Enter Last Name"}
          title={"Last Name"}
        />
        <TextInput
          value={email}
          onValueChange={setEmail}
          placeHolder={"Enter Email"}
          title={"Email"}
        />
        <TextInput
          value={password}
          onValueChange={setPassword}
          placeHolder={"Enter Password"}
          title={"Password"}
        />
      </form>
    </div>
  );
}

export default SignUp;
