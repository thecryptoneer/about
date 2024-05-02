import React, { useRef } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const techSkills = [
  { subject: "Frontend", A: 98, fullMark: 100 },
  { subject: "Web3", A: 98, fullMark: 100 },
  { subject: "APIs", A: 98, fullMark: 100 },
  { subject: "Backend", A: 85, fullMark: 100 },
  { subject: "Databases", A: 80, fullMark: 100 },
  { subject: "Tests", A: 75, fullMark: 100 },
  { subject: "DevOps", A: 75, fullMark: 100 },
  { subject: "CI/CD", A: 75, fullMark: 100 },
];

const frontendSkills = [
  { subject: "JavaScript", A: 95 },
  { subject: "Next.js", A: 95 },
  { subject: "React", A: 80 },
  { subject: "Angular", A: 80 },
  { subject: "Node.js", A: 95 },
  { subject: "GraphQL", A: 75 },
  { subject: "REST APIs", A: 95 },
  { subject: "TypeScript", A: 90 },
];

const businessSkills = [
  { subject: "Project Management", A: 90, fullMark: 100 },
  { subject: "Leadership", A: 88, fullMark: 100 },
  { subject: "Product Innovation", A: 85, fullMark: 100 },
  { subject: "Strategic Planning", A: 90, fullMark: 100 },
];

const teamSkills = [
  { subject: "Team Building", A: 90, fullMark: 100 },
  { subject: "Mentoring", A: 90, fullMark: 100 },
  { subject: "Conflict Resolution", A: 90, fullMark: 100 },
  { subject: "Data-Driven Decision-Making", A: 90, fullMark: 100 },
  { subject: "Risk Management", A: 90, fullMark: 100 },
  { subject: "Resource Allocation", A: 90, fullMark: 100 },
];

const languages = [
  { subject: "JavaScript", A: 100 },
  { subject: "TypeScript", A: 95 },
  { subject: "Python", A: 85 },
  { subject: "PHP", A: 70 },
  { subject: "Go", A: 65 },
  { subject: "C#", A: 50 },
  { subject: "Java", A: 70 },
  { subject: "Rust", A: 50 },
  { subject: "Solidity", A: 75 },
];

const databases = [
  { subject: "Postgres", A: 80 },
  { subject: "MongoDB", A: 100 },
  { subject: "Mongoose", A: 95 },
  { subject: "GraphQL", A: 75 },
  { subject: "Apollo", A: 75 },
  { subject: "MySQL", A: 65 },
  { subject: "SQLite", A: 55 },
  { subject: "Drizzle", A: 70 },
  { subject: "Prisma", A: 70 },
];

const frontendFrameworks = [
  { subject: "Next.js", A: 100 },
  { subject: "Angular", A: 90 },
  { subject: "React", A: 85 },
  { subject: "Vue", A: 75 },
  { subject: "Nuxt.js", A: 50 },
  { subject: "Svelte", A: 60 },
];

const backendFrameworks = [
  { subject: "Node.js", A: 100 },
  { subject: "Express", A: 95 },
  { subject: "NestJS", A: 85 },
  { subject: "Django", A: 75 },
  { subject: "Spring", A: 55 },
  { subject: "Ruby", A: 65 },
  { subject: "Go", A: 75 },
];

const web3Skills = [
  { subject: "EVM", A: 80 },
  { subject: "Wallets", A: 95 },
  { subject: "DApps", A: 100 },
  { subject: "NFTs", A: 95 },
  { subject: "DeFi", A: 80 },
  { subject: "Indexing", A: 65 },
  { subject: "DuneSQL", A: 75 },
];

const devOpsSkills = [
  { subject: "CI/CD", A: 75 },
  { subject: "Docker", A: 90 },
  { subject: "Kubernetes", A: 75 },
  { subject: "Serverless", A: 85 },
  { subject: "Monitoring", A: 60 },
  { subject: "Logging", A: 65 },
  { subject: "Scaling", A: 75 },
];

export default function Skills() {
  const ref: any = useRef(undefined);

  const getWidth = () => {
    if (ref?.current) {
      return ref.current.offsetWidth;
    }
    return 0;
  };

  return (
    <div ref={ref}>
      <div
        className={cn(
          "grid mt-6 gap-2",
          getWidth() > 900
            ? "grid-cols-3 mt-6 gap-2"
            : getWidth() > 400
              ? "grid-cols-2 mt-6 gap-2"
              : getWidth() > 100
                ? "grid-cols-1 mt-6 gap-2"
                : "",
        )}
      >
        <div className={"flex flex-col justify-start items-center"}>
          <p className={"text-center"}>Languages</p>
          <Chart data={languages} />
        </div>

        <div className={"flex flex-col justify-start items-center"}>
          <p className={"text-center"}>Frontend</p>
          <Chart data={frontendFrameworks} />
        </div>

        <div className={"flex flex-col justify-start items-center"}>
          <p className={"text-center"}>Backend</p>
          <Chart data={backendFrameworks} />
        </div>

        <div className={"flex flex-col justify-start items-center"}>
          <p className={"text-center"}>Database</p>
          <Chart data={databases} />
        </div>

        <div className={"flex flex-col justify-start items-center"}>
          <p className={"text-center"}>DevOps</p>
          <Chart data={devOpsSkills} />
        </div>

        <div className={"flex flex-col justify-start items-center"}>
          <p className={"text-center"}>Web3</p>
          <Chart data={web3Skills} />
        </div>
      </div>
    </div>
  );
}

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid gridType={"polygon"} opacity={0.4} />
        <PolarAngleAxis dataKey="subject" fontSize={"13px"} />
        {/*<PolarRadiusAxis />*/}
        <Radar
          name="Jonas"
          dataKey="A"
          stroke={"rgb(42,47,40)"}
          fill={"#a0d884"}
          fillOpacity={0.7}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
