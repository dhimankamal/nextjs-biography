import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {}

const Login: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    const id = toast.loading("Please wait...");
    event.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", formData);

      if (res?.data && res?.data?.token) {
        console.log("res?.data?.token", res?.data?.token);
        cookie.set("token", res?.data?.token, { expires: 1 });
        toast.update(id, {
          render: "Welcome! You have successfully logged in to your account.",
          type: "success",
          isLoading: false,
          autoClose: 6000,
        });
        router.push("/dashboard");
      } else {
        toast.update(id, {
          render:
            "Sorry, we couldn't log you in. Please check your email and password and try again.",
          type: "error",
          isLoading: false,
          autoClose: 7000,
        });
      }
      console.log("res", res);
    } catch (error) {
      toast.update(id, {
        render:
          "Sorry, we couldn't log you in. Please check your email and password and try again.",
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
      <h1>Login</h1>
      <p>Access your account anytime, anywhere with just one click.</p>
      <form className="py-6 space-y-4 w-6/12" onSubmit={handleLogin}>
        <Input
          label="Username"
          inputProps={{
            placeholder: "Enter your email",
            name: "email",
            onChange: handleInputChange,
          }}
        />
        <Input
          label="Password"
          inputProps={{
            placeholder: "Enter your password",
            type: "password",
            name: "password",
            onChange: handleInputChange,
          }}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
