import { cn } from "@/lib/utils";
import { ChildrenAndClassName, IJobItem, IJobSection } from "@/interfaces";
import { useStore } from "@/store";

export default function CV() {
  const cvData: any = useStore((state) => state.cvData);
  if (!cvData) return null;

  return (
    <div className={"flex flex-col gap-1"}>
      <Headline className={"mt-0 text-gray-50"}>{cvData.contact.name}</Headline>
      <ContactInfo />

      <Headline>{cvData.summary.name}</Headline>
      <Paragraph>{cvData.summary.description}</Paragraph>

      <Headline>{cvData.experience.name}</Headline>
      <JobSection />

      <Headline className={"mt-0"}>{cvData.education.name}</Headline>
      <EduSection />

      <Headline>{cvData.businessSkills.name}</Headline>
      <Paragraph>{cvData.businessSkills.items.join(", ")}</Paragraph>

      <Headline>{cvData.technicalSkills.name}</Headline>
      <Paragraph>{cvData.technicalSkills.items.join(", ")}</Paragraph>

      <Headline>{cvData.languages.name}</Headline>
      <Paragraph>{cvData.languages.items.join(", ")}</Paragraph>

      <Headline>{cvData.achievements.name}</Headline>

      <ul className="list-disc pl-8">
        {cvData.achievements.items.map((item: string, index: number) => {
          return (
            <li key={`achievement-${index}`}>
              <Achievement>{item}</Achievement>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const ContactInfo = () => {
  const cvData = useStore((state) => state.cvData);
  return (
    <div className={cn("flex flex-col gap-2")}>
      <HeaderItem>{cvData?.contact?.location}</HeaderItem>
      <HeaderItem>{cvData?.contact?.phone}</HeaderItem>
      <HeaderItem>
        <a href={cvData?.contact?.email}>{cvData?.contact?.email}</a>
      </HeaderItem>
      <HeaderItem>
        <a href={cvData?.contact?.linkedin}>{cvData?.contact?.linkedin}</a>
      </HeaderItem>
    </div>
  );
};

const HeaderItem = ({ children, className }: ChildrenAndClassName) => {
  return <p className={cn("text-[15px] font-light")}>{children}</p>;
};

const Headline = ({ children, className }: ChildrenAndClassName) => {
  return (
    <h1
      className={cn(
        "mt-6 text-[20px] text-stone-400 font-bold",
        className ?? "",
      )}
    >
      {children}
    </h1>
  );
};

const Paragraph = ({ children, className }: ChildrenAndClassName) => {
  return <p className={cn("text-[15px] font-light")}>{children}</p>;
};

const Achievement = ({ children, className }: ChildrenAndClassName) => {
  return <p className={cn("text-[15px]")}>{children}</p>;
};

const JobRole = ({ children, className }: ChildrenAndClassName) => {
  return (
    <h3 className={cn("text-[17px] font-bold text-zinc-50")}>{children}</h3>
  );
};

const CompanyName = ({ children, className }: ChildrenAndClassName) => {
  return (
    <h4 className={cn("text-[15px] font-light text-blue-300")}>{children}</h4>
  );
};

const CompanyInfo = ({ children, className }: ChildrenAndClassName) => {
  return <p className={cn("text-[15px] text-gray-00 py-2")}>{children}</p>;
};

const WorkDuration = ({ children, className }: ChildrenAndClassName) => {
  return <p className={cn("text-[15px] text-gray-300")}>{children}</p>;
};

const JobSection = () => {
  const cvData = useStore((state) => state.cvData);
  const data: IJobSection = cvData?.experience;
  const items: IJobItem[] = data?.items || [];

  return (
    <>
      {items.map((item: IJobItem, i: number) => (
        <div className={cn("flex flex-col")} key={`experience-${i}`}>
          <div className={cn("flex w-full justify-between items-start")}>
            <div>
              <JobRole>{item.role}</JobRole>
              <CompanyName>{item.company}</CompanyName>
            </div>
            <WorkDuration>{item.duration}</WorkDuration>
          </div>

          <CompanyInfo>{item.description}</CompanyInfo>
          <ul className={cn("list-disc pl-8 mt-2 mb-8")}>
            {item.list.map((item: string, index: number) => (
              <li key={`experience-detail-${index}`}>
                <Paragraph>{item}</Paragraph>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

interface EducationItem {
  org: string;
  duration: string;
  role: string;
}

interface EducationSection {
  name: string;
  items: EducationItem[];
}

const EduSection = () => {
  const cvData = useStore((state) => state.cvData) ?? {};
  const data: EducationSection = cvData?.education;
  const items: EducationItem[] = data?.items || [];

  return (
    <>
      {items.map((item: EducationItem, i: number) => (
        <div className={cn("flex flex-col")} key={`education-${i}`}>
          <div className={"flex justify-between"}>
            <JobRole>{item.org}</JobRole>
            <WorkDuration>{item.duration}</WorkDuration>
          </div>
          <CompanyName>{item.role}</CompanyName>
        </div>
      ))}
    </>
  );
};
