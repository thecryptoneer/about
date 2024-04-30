import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CredentialsInput from "@/components/credentials-input";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading-spinner";

export default function LoginAccount() {
  const setStep = useStore((state) => state.setStep);
  const step = useStore((state) => state.step);
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

  const onSubmit = (value?: string): void => {
    const credentialInput: string = useStore.getState().credentialInput;
    if (credentialInput || value) {
      setStep({ value: "loggingIn", label: "Logging In", duration: -1 });
      setTimeout(() => {
        setStep({ value: "success", label: "Success", duration: -1 });
      }, 1600);
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
        <LoadingSpinner />
      </div>
      <div className={cn(isVisible(["login"]) ? "block" : "hidden")}>
        <CredentialsInput onSubmit={onSubmit} />
      </div>
    </div>
  );
}
