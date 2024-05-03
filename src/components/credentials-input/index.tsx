import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import React, { useEffect, useRef } from "react";

export interface CredentialsInputProps {
  onSubmit: (step: any) => void;
}



export default function CredentialsInput({ onSubmit }: CredentialsInputProps) {
  const setCredentialInput = useStore((state) => state.setCredentialInput);
  const credentialInput = useStore((state) => state.credentialInput);

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialInput(e?.target?.value ?? "");
  };

  const inputRef: any = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (credentialInput === "" && inputRef?.current?.value) {
      // reset input
      inputRef.current.value = "";
    }
  }, [credentialInput, inputRef?.current?.value]);

  return (
    <div
      className={cn(
        "flex flex-row justify-between bg-zinc-500/70 px-4 rounded-full h-[32px] items center w-[180px]",
        credentialInput ? "pr-[2px]" : "",
      )}
    >
      <input
        onChange={handlePwChange}
        id="pwInput"
        type="password"
        autoComplete={"off"}
        ref={inputRef}
        placeholder={"Passwort eingeben"}
        className={cn(
          "focus:outline-none font-medium placeholder placeholder-gray-200 bg-transparent w-full",
          credentialInput ? "text-[17px]" : "text-[13px]",
        )}
      />

      <div
        onClick={() => {
          onSubmit(inputRef?.current?.value);
        }}
        className={cn(
          "transition-all duration-300 ease-in",
          credentialInput ? "flex justify-center items-center" : "hidden",
          "w-[28px]",
        )}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99121 18.7422C14.9746 18.7422 19.0879 14.6289 19.0879 9.6543C19.0879 4.67969 14.9658 0.566406 9.98242 0.566406C5.00781 0.566406 0.90332 4.67969 0.90332 9.6543C0.90332 14.6289 5.0166 18.7422 9.99121 18.7422ZM9.99121 16.9316C5.95703 16.9316 2.73145 13.6885 2.73145 9.6543C2.73145 5.62012 5.95703 2.38574 9.98242 2.38574C14.0166 2.38574 17.2598 5.62012 17.2686 9.6543C17.2773 13.6885 14.0254 16.9316 9.99121 16.9316ZM14.5264 9.6543C14.5264 9.41699 14.4385 9.22363 14.2363 9.03027L11.248 6.08594C11.1074 5.94531 10.9316 5.875 10.7207 5.875C10.3076 5.875 10.0088 6.18262 10.0088 6.5957C10.0088 6.81543 10.1055 7 10.2373 7.13184L11.3008 8.15137L12.2852 8.95117L10.4922 8.86328H6.20312C5.75488 8.86328 5.43848 9.19727 5.43848 9.6543C5.43848 10.1025 5.75488 10.4453 6.20312 10.4453H10.4922L12.2939 10.3662L11.3096 11.1572L10.2373 12.1768C10.0879 12.3086 10.0088 12.4932 10.0088 12.7129C10.0088 13.126 10.3076 13.4424 10.7207 13.4424C10.9316 13.4424 11.1074 13.3633 11.248 13.2227L14.2363 10.2871C14.4297 10.0938 14.5264 9.90039 14.5264 9.6543Z"
            fill="#ffffffd0"
          />
        </svg>
      </div>
    </div>
  );
}
