import Image from "next/image";
import { cn } from "@/lib/utils";

export function VolIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill={"#fff"}>
      <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
    </svg>
  );
}

export function BluetoothIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      height={18}
      fill="#fff"
    >
      <path d="M196.48 260.023l92.626-103.333L143.125 0v206.33l-86.111-86.111-31.406 31.405 108.061 108.399L25.608 368.422l31.406 31.405 86.111-86.111L145.84 512l148.552-148.644-97.912-103.333zm40.86-102.996l-49.977 49.978-.338-100.295 50.315 50.317zM187.363 313.04l49.977 49.978-50.315 50.316.338-100.294z" />
    </svg>
  );
}

export function WifiIcon() {
  return (
    <svg
      width={15}
      height={15}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      fill={"#fff"}
    >
      <path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg
      width={13}
      height={13}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill={"#fff"}
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      height={15}
      width={15}
      fill="#fff"
    >
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
}

export function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      height={18}
      width={18}
      fill="#fff"
    >
      <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
    </svg>
  );
}

export function KeyboardIcon() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 24 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.68555 14.7734H20.3057C22.2041 14.7734 23.1973 13.7891 23.1973 11.9082V3.3916C23.1973 1.51074 22.2041 0.526367 20.3057 0.526367H3.68555C1.77832 0.526367 0.793945 1.51074 0.793945 3.3916V11.9082C0.793945 13.7891 1.77832 14.7734 3.68555 14.7734ZM3.7998 13.0156C2.99121 13.0156 2.54297 12.5938 2.54297 11.75V3.5498C2.54297 2.69727 2.99121 2.27539 3.7998 2.27539H20.1914C21 2.27539 21.4482 2.69727 21.4482 3.5498V11.75C21.4482 12.5938 21 13.0156 20.1914 13.0156H3.7998ZM4.64355 5.66797H5.45215C5.70703 5.66797 5.86523 5.50977 5.86523 5.25488V4.44629C5.86523 4.19141 5.70703 4.0332 5.45215 4.0332H4.64355C4.38867 4.0332 4.23047 4.19141 4.23047 4.44629V5.25488C4.23047 5.50977 4.38867 5.66797 4.64355 5.66797ZM7.4209 5.66797H8.22949C8.48438 5.66797 8.64258 5.50977 8.64258 5.25488V4.44629C8.64258 4.19141 8.48438 4.0332 8.22949 4.0332H7.4209C7.16602 4.0332 7.00781 4.19141 7.00781 4.44629V5.25488C7.00781 5.50977 7.16602 5.66797 7.4209 5.66797ZM10.1895 5.66797H10.998C11.2529 5.66797 11.4111 5.50977 11.4111 5.25488V4.44629C11.4111 4.19141 11.2529 4.0332 10.998 4.0332H10.1895C9.93457 4.0332 9.77637 4.19141 9.77637 4.44629V5.25488C9.77637 5.50977 9.93457 5.66797 10.1895 5.66797ZM12.9668 5.66797H13.7754C14.0303 5.66797 14.1885 5.50977 14.1885 5.25488V4.44629C14.1885 4.19141 14.0303 4.0332 13.7754 4.0332H12.9668C12.7119 4.0332 12.5537 4.19141 12.5537 4.44629V5.25488C12.5537 5.50977 12.7119 5.66797 12.9668 5.66797ZM15.7617 5.66797H16.5439C16.7988 5.66797 16.957 5.50977 16.957 5.25488V4.44629C16.957 4.19141 16.7988 4.0332 16.5439 4.0332H15.7617C15.4893 4.0332 15.3311 4.19141 15.3311 4.44629V5.25488C15.3311 5.50977 15.4893 5.66797 15.7617 5.66797ZM18.5127 5.66797H19.3213C19.5762 5.66797 19.7344 5.50977 19.7344 5.25488V4.44629C19.7344 4.19141 19.5762 4.0332 19.3213 4.0332H18.5127C18.2578 4.0332 18.0996 4.19141 18.0996 4.44629V5.25488C18.0996 5.50977 18.2578 5.66797 18.5127 5.66797ZM4.64355 8.46289H5.45215C5.70703 8.46289 5.86523 8.30469 5.86523 8.0498V7.24121C5.86523 6.98633 5.70703 6.82812 5.45215 6.82812H4.64355C4.38867 6.82812 4.23047 6.98633 4.23047 7.24121V8.0498C4.23047 8.30469 4.38867 8.46289 4.64355 8.46289ZM7.4209 8.46289H8.22949C8.48438 8.46289 8.64258 8.30469 8.64258 8.0498V7.24121C8.64258 6.98633 8.48438 6.82812 8.22949 6.82812H7.4209C7.16602 6.82812 7.00781 6.98633 7.00781 7.24121V8.0498C7.00781 8.30469 7.16602 8.46289 7.4209 8.46289ZM10.1895 8.46289H10.998C11.2529 8.46289 11.4111 8.30469 11.4111 8.0498V7.24121C11.4111 6.98633 11.2529 6.82812 10.998 6.82812H10.1895C9.93457 6.82812 9.77637 6.98633 9.77637 7.24121V8.0498C9.77637 8.30469 9.93457 8.46289 10.1895 8.46289ZM12.9668 8.46289H13.7754C14.0303 8.46289 14.1885 8.30469 14.1885 8.0498V7.24121C14.1885 6.98633 14.0303 6.82812 13.7754 6.82812H12.9668C12.7119 6.82812 12.5537 6.98633 12.5537 7.24121V8.0498C12.5537 8.30469 12.7119 8.46289 12.9668 8.46289ZM15.7617 8.46289H16.5439C16.7988 8.46289 16.957 8.30469 16.957 8.0498V7.24121C16.957 6.98633 16.7988 6.82812 16.5439 6.82812H15.7617C15.4893 6.82812 15.3311 6.98633 15.3311 7.24121V8.0498C15.3311 8.30469 15.4893 8.46289 15.7617 8.46289ZM18.5127 8.46289H19.3213C19.5762 8.46289 19.7344 8.30469 19.7344 8.0498V7.24121C19.7344 6.98633 19.5762 6.82812 19.3213 6.82812H18.5127C18.2578 6.82812 18.0996 6.98633 18.0996 7.24121V8.0498C18.0996 8.30469 18.2578 8.46289 18.5127 8.46289ZM4.64355 11.2578H5.45215C5.70703 11.2578 5.86523 11.0996 5.86523 10.8447V10.0361C5.86523 9.78125 5.70703 9.62305 5.45215 9.62305H4.64355C4.38867 9.62305 4.23047 9.78125 4.23047 10.0361V10.8447C4.23047 11.0996 4.38867 11.2578 4.64355 11.2578ZM7.49121 11.2578H16.4736C16.7812 11.2578 16.957 11.082 16.957 10.7744V10.1064C16.957 9.79883 16.7812 9.62305 16.4736 9.62305H7.49121C7.18359 9.62305 7.00781 9.79883 7.00781 10.1064V10.7744C7.00781 11.082 7.18359 11.2578 7.49121 11.2578ZM18.5127 11.2578H19.3213C19.5762 11.2578 19.7344 11.0996 19.7344 10.8447V10.0361C19.7344 9.78125 19.5762 9.62305 19.3213 9.62305H18.5127C18.2578 9.62305 18.0996 9.78125 18.0996 10.0361V10.8447C18.0996 11.0996 18.2578 11.2578 18.5127 11.2578Z"
        fill="#fff"
      />
    </svg>
  );
}

export function BatteryIcon() {
  return (
    <svg
      width={24}
      height={13}
      viewBox="0 0 28 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.61523 12.8066H19.3965C20.9961 12.8066 22.2529 12.6309 23.1582 11.7256C24.0547 10.8203 24.2217 9.58105 24.2217 7.98145V5.33594C24.2217 3.72754 24.0547 2.48828 23.1582 1.5918C22.2441 0.686523 20.9961 0.510742 19.3965 0.510742H5.58887C4.01562 0.510742 2.75879 0.686523 1.8623 1.5918C0.957031 2.49707 0.790039 3.73633 0.790039 5.30957V7.98145C0.790039 9.58105 0.957031 10.8291 1.85352 11.7256C2.76758 12.6309 4.01562 12.8066 5.61523 12.8066ZM5.36914 11.084C4.46387 11.084 3.61133 10.9521 3.11914 10.4688C2.62695 9.97656 2.5127 9.1416 2.5127 8.22754V5.10742C2.5127 4.18457 2.62695 3.34082 3.11035 2.84863C3.60254 2.35645 4.46387 2.2334 5.38672 2.2334H19.6426C20.5566 2.2334 21.4092 2.35645 21.8926 2.84863C22.3848 3.34082 22.499 4.17578 22.499 5.08984V8.22754C22.499 9.1416 22.3848 9.97656 21.8926 10.4688C21.4092 10.9609 20.5566 11.084 19.6426 11.084H5.36914ZM5.02637 9.97656H15.5469C16.0918 9.97656 16.417 9.89746 16.6455 9.66895C16.8652 9.44043 16.9531 9.11523 16.9531 8.5791V4.73828C16.9531 4.19336 16.8652 3.86816 16.6455 3.64844C16.417 3.41992 16.0918 3.34082 15.5469 3.34082H5.04395C4.48145 3.34082 4.15625 3.41992 3.92773 3.63965C3.70801 3.86816 3.62012 4.20215 3.62012 4.75586V8.5791C3.62012 9.12402 3.70801 9.44043 3.92773 9.66895C4.15625 9.89746 4.48145 9.97656 5.02637 9.97656ZM25.5049 9.03613C26.2344 8.99219 27.21 8.06055 27.21 6.6543C27.21 5.25684 26.2344 4.31641 25.5049 4.27246V9.03613Z"
        fill="#fff"
      />
    </svg>
  );
}

export interface GenericIconProps {
  src: string;
  width: number;
  height: number;
}
export function DraggableGenericIcon({src, width, height}: GenericIconProps) {
  return (
    <div style={{backgroundImage: `url('${src}')`, width, height}} className={"bg-center bg-no-repeat bg-contain"}></div>
  )
}

export function ControlIcon() {
  return (
    <Image
      src="/assets/images/control.png"
      alt="Control Center Icon"
      className={"invert"}
      width={14}
      height={14}
    />
  );
}

export function SiriIcon() {
  return (
    <Image
      src="/assets/images/siri.png"
      alt="Siri Icon"
      width={15}
      height={15}
    />
  );
}

export function FolderIcon() {
  return (
    <div
      className={cn(
        "w-[72px] h-[72px] bg-folderCode2 bg-center bg-no-repeat bg-contain",
      )}
    ></div>
  );
}

export function TextIcon() {
  return (
    <div
      className={cn(
        "w-[72px] h-[72px] bg-textIcon bg-center bg-no-repeat bg-contain",
      )}
    ></div>
  );
}
