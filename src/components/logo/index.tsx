import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
}

export default function Logo({ className, width }: LogoProps) {
  const ratio: number = 814 / 1000;
  return (
    <Image
      priority={true}
      src={"/assets/apple_logo_black.svg"}
      alt={"Logo"}
      width={width ?? 200}
      height={width ? width * ratio : 162.8}
      className={className ? className : ""}
    />
  );
}
