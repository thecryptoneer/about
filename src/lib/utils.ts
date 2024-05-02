import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { verifyMessage } from "@ethersproject/wallet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const throttle: any = (func: any, limit: number): any => {
  let lastFunc: any;
  let lastRan: any;
  const _this: any = this;
  return function () {
    const context: any = _this;
    const args: any = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
};

export const safeVerifyMessage = (address, message, signature) => {
  try {
    // console.log({'safeVerifyMessage':  address, message, signature})
    const signerAddress = verifyMessage(message, signature);
    // console.log({signerAddress})
    if (signerAddress.toLowerCase() === address?.toLowerCase()) {
      return true;
    }
    return false;
  } catch (e: any) {
    // console.log("Error verifying signature:", e.message);
    return false;
  }
};
