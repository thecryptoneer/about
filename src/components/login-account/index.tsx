import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CredentialsInput from "@/components/credentials-input";
import { useEffect, useState } from "react";
import { PUBLIC_API_ROUTES } from "../../../config/api";
import LoadingSpinner from "@/components/loading-spinner";
import {LoginForm} from "@/components/forms/login-form";

export default function LoginAccount() {
  const setStepByValue = useStore((state) => state.setStepByValue);
  const step = useStore((state) => state.step);
  const setCredentialInput = useStore((state) => state.setCredentialInput);
  const setCvData = useStore((state) => state.setCvData);
  const [error, setError] = useState<string>("");
  const isVisible = (values: string[]): boolean => values.includes(step.value);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.code === "Enter") {
        onSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSubmit = async (value?: string): Promise<void> => {
    setError("");
    const credentialInput: string = useStore.getState().credentialInput;
    if (credentialInput || value) {
      setStepByValue("loggingIn");
      const response = await fetch(PUBLIC_API_ROUTES.signIn.url, {
        method: PUBLIC_API_ROUTES.signIn.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: credentialInput || value }),
      }).then((res) => res.json());

      if (response.error) {
        setError(response.error);
        setCredentialInput("");
        setStepByValue("login");
      }

      if (response?.result?.cvData) {
        setCvData(response.result.cvData);
      }

      if (response.result?.token) {
        setStepByValue("success");
      } else {
        setStepByValue("login");
        setCredentialInput("");
      }
    }
  };

  return (
    <div className={cn("flex flex-col justify-center items-center gap-4")}>
      <Image
        className="rounded-full"
        src={"/assets/avatar.png"}
        width={60}
        height={60}
        alt={"avatar"}
      />
      <p className="text-lg font-medium">Jonas Winnen</p>
      <div className={cn(isVisible(["loggingIn"]) ? "block" : "hidden")}>
        {error ? <p className="text-red-500">{error}</p> : <LoadingSpinner />}
      </div>
      <div className={cn(isVisible(["login"]) ? "block" : "hidden")}>
        <LoginForm onSubmit={onSubmit} />
        {/*<CredentialsInput onSubmit={onSubmit} />*/}
      </div>
    </div>
  );
}
