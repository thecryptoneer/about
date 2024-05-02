"use client";
import React, { createContext, useCallback, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { debounce } from "@/lib/debounce";
import { APIResponse } from "@/interfaces";
import { baseHeaders, PUBLIC_API_ROUTES } from "../../config/api";
import { safeVerifyMessage } from "@/lib/utils";

export const AuthProvideContext = createContext({});

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const checks = useAuthStore((state: any) => state.checks);
  const setAddress = useAuthStore((state: any) => state.setAddress);
  const setToken = useAuthStore((state: any) => state.setToken);
  const token = useAuthStore((state: any) => state.token);
  const resetAuthStore = useAuthStore((state: any) => state.resetAuthStore);

  const protectedRoutes = ["/internal"];

  // Wagmi/WalletConnect
  const { address, isDisconnected, status } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // debounced authentication check
  useEffect(() => {
    if (address && checks > 0) {
      checkAuthDebounced(address as unknown as any);
    }
    setAddress(address);
  }, [address, status, checks]);

  useEffect(() => {
    // reset auth token on disconnect
    if (pathname && router && status === "disconnected") {
      resetAuthStore();

      // redirect to home if on protected route
      const routeCheck = protectedRoutes.map((route) => {
        if (pathname.startsWith(route)) {
          return true;
        }
        return false;
      });
      if (routeCheck.includes(true)) {
        router.push("/");
      }
    }
  }, [isDisconnected, pathname, router, status]);

  useEffect(() => {
    if (token) {
      // fetch private data
    }
  }, [token]);

  // debounced authentication check
  const checkAuthDebounced = useCallback(
    debounce((_address: string) => checkAuth(_address), 3000, true),
    [],
  );

  const checkAuth = async (_address: string) => {
    let auth_token: string = "";
    console.log(
      `check authentication for ${_address} (request message to sign or return signature)`,
    );
    try {
      if (!_address) {
        console.log("No address detected. Skipping connection.");
        enforceRouteProtection(auth_token);
        return;
      }
      if (isDisconnected) {
        console.log("Wallet is not disconnected. Skipping connection.");
        enforceRouteProtection(auth_token);
        return;
      }

      // fetch message from api
      const response: APIResponse = await fetch(
        PUBLIC_API_ROUTES.requestMessage.url + `?address=${_address}`,
        {
          method: PUBLIC_API_ROUTES.requestMessage.method,
          headers: baseHeaders,
        },
      ).then((res) => res.json());
      // console.log({messageRequest: response})
      if (response?.error) {
        throw new Error(response.error);
      }

      // if token is returned, set token
      if (response?.result?.token) {
        auth_token = response.result.token;
        setToken(response?.result?.token);
        // toast({
        //   title: "Token",
        //   variant: "default",
        //   description: "You have successfully connected your wallet.",
        // });
        enforceRouteProtection(auth_token);
        return;
      }

      // if no token is returned, user must sign message
      if (response?.result?.message && response?.result?.messageId) {
        const { message, messageId } = response.result;
        let { token: _token, error: signError } = await signAuthMessage(
          message,
          messageId,
        );
        if (signError) {
          throw new Error(signError);
        }
        if (!_token) {
          throw new Error("No token received");
        }
        auth_token = _token;
        // toast({
        //   title: "Token",
        //   variant: "default",
        //   description: "You have successfully connected your wallet.",
        // });
        enforceRouteProtection(auth_token);
        return;
      }
    } catch (error: any) {
      console.error({ error });
      // toast({
      //   title: "Error",
      //   variant: "destructive",
      //   description: "An error occurred while trying to sign the message.",
      // });
      enforceRouteProtection(auth_token);
    }
  };

  const enforceRouteProtection = (auth_token: string) => {
    if (!auth_token) {
      router.push("/");
    } else {
      if (router && pathname === "/") {
        router.push("/dashboard");
      }
    }
  };

  const signAuthMessage = async (
    message: string,
    messageId: string,
  ): Promise<{ error; signature; token }> => {
    return new Promise(async (resolve) => {
      try {
        const _signature = await signMessageAsync({ message });
        console.log({ signMessageAsync: _signature });
        const isValid = safeVerifyMessage(address, message, _signature);
        console.log({ isValid });
        if (!isValid) {
          throw new Error("Invalid signature");
        }

        // save to db
        const response = await fetch(
          PUBLIC_API_ROUTES.signMessage.url + `?address=${address}`,
          {
            method: PUBLIC_API_ROUTES.signMessage.method,
            headers: baseHeaders,
            body: JSON.stringify({
              signature: _signature,
              messageId,
            }),
          },
        ).then((res) => res.json());
        console.log({ signResponse: response });

        if (response?.error) {
          throw new Error(response.error);
        }

        let _token: string | undefined;
        if (response?.result?.token) {
          _token = response.result.token;
          setToken(response.result.token);
          // toast({
          //   title: "Token",
          //   variant: "default",
          //   description: "You have successfully connected your wallet.",
          // });
        }

        resolve({ signature: _signature, token: _token, error: undefined });
      } catch (error: any) {
        console.log({ signAuthMessage: error });
        // toast({
        //   title: "Error",
        //   variant: "destructive",
        //   description: "An error occurred while trying to sign the message.",
        // });
        resolve({ signature: undefined, token: undefined, error: error });
      }
    });
  };

  if (!router || !pathname || !status) {
    // loading screen
    return <div>Loading...</div>;
  }

  // pass data to children
  return (
    <AuthProvideContext.Provider value={{}}>
      {children}
    </AuthProvideContext.Provider>
  );
}
