import { create } from "zustand";
import { IStep } from "@/interfaces";
import { wait } from "@/lib/utils";
import { devtools } from "zustand/middleware";

export interface StoreState {
  cvData: any;
  step: IStep;
  credentialInput: string;
  connectionSpeed: string;
}

export interface StoreActions {
  setCvData: (cvData: any) => void;
  setStep: (step: IStep) => void;
  setStepByValue: (nextStepValue: string) => void;
  setCredentialInput: (credentialInput: string) => void;
  setConnectionSpeed: (connectionSpeed: string) => void;
  reset: () => void;
}
export const steps: IStep[] = [
  { value: "idle", label: "Idle", duration: 1000 },
  { value: "loading", label: "Loading", duration: 1500 },
  { value: "login", label: "Login", duration: -1 },
  { value: "loggingIn", label: "LoggingIn", duration: -1 },
  { value: "success", label: "Success", duration: -1 },
  { value: "error", label: "Error", duration: -1 },
];

type Store = StoreState & StoreActions;

export const useStore: any = create<Store>((set) => {
  return {
    cvData: null,
    setCvData: (cvData: any) => set({ cvData }),
    step: { value: "idle", label: "Idle", duration: 1000 },
    setStep: (step: IStep) => set({ step }),
    setStepByValue: (nextStepValue: string) =>
      set((state) => {
        // set step immediately
        const stepIndex = steps.findIndex(
          (step) => step.value === nextStepValue,
        );
        set({ step: steps[stepIndex] });

        // if duration is set, wait for it to pass before setting next step automatically
        if (stepIndex + 1 < steps.length && steps[stepIndex]?.duration > 0) {
          wait(steps[stepIndex].duration).then(() => {
            state.setStepByValue(steps[stepIndex + 1].value);
          });
        }
        return {};
      }),
    credentialInput: "",
    setCredentialInput: (credentialInput: string) => set({ credentialInput }),
    connectionSpeed: "",
    setConnectionSpeed: (connectionSpeed: string) => set({ connectionSpeed }),
    reset: () => set({}),
  };
});
