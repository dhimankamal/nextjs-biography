import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {}

const Signup: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = toast.loading("Please wait...");
    try {
      const res = await axios.post("/api/auth/register", formData);
      console.log("res", res)
      if (res) {
        toast.update(id, {
          render: "Welcome! You have successfully register account.",
          type: "success",
          isLoading: false,
          autoClose: 6000,
        });
        router.push("/auth/login");
      } else {
        toast.update(id, {
          render: "Sorry, we couldn't register you in.",
          type: "error",
          isLoading: false,
          autoClose: 7000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Sorry, we couldn't register you in.",
        type: "error",
        isLoading: false,
        autoClose: 7000,
      });
      console.log("error", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="container mx-auto py-12">
      <h1>Sign up</h1>
      <p>Welcome to Gossipgeeks</p>
      <form className="py-6 space-y-4 w-6/12" onSubmit={handleSignUp}>
        <Input
          label="Full name"
          inputProps={{
            placeholder: "Enter your full name",
            name: "name",
            onChange: handleInputChange,
            required: true,
          }}
        />
        <Input
          label="Email address"
          inputProps={{
            placeholder: "Enter your email",
            name: "email",
            type:"email",
            onChange: handleInputChange,
            required: true,
          }}
        />
        <Input
          label="Password"
          inputProps={{
            placeholder: "Enter your password",
            type: "password",
            name: "password",
            onChange: handleInputChange,
            required: true,
          }}
        />
        <Input
          label="Confirm password"
          inputProps={{
            placeholder: "Confirm your password",
            type: "password",
            required: true,
          }}
        />
        <div className="!mt-8">
          <Button type="submit">Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
