import {cn} from "@/lib/utils";
import {FC} from "react";

const Headline = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <h1 className={cn('mt-6 text-[20px] text-gray-500 font-bold', className)}>{children}</h1>
}

const HeaderItem = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <p className={cn('text-[13px] font-light')}>{children}</p>
}

const ContactInfo = () => {
  return (
    <div className={cn('flex flex-col gap-2')}>
      <HeaderItem>Berlin, Germany</HeaderItem>
      <HeaderItem>+49 152 22799383</HeaderItem>
      <HeaderItem>
        <a href="mailto:winnenjonas@gmail.com">
          winnenjonas@gmail.com
        </a>
      </HeaderItem>
      <HeaderItem>
        <a href="https://jonaswinnen.com">
          linkedin.com/in/jonas-winnen/
        </a>
      </HeaderItem>
    </div>
  )
}

const CompanyInfo = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <p className={cn('text-[15px] text-gray-00 py-2')}>{children}</p>
}

const SubHeadline = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <h2 className={cn('text-[17px] text-blue-300 mt-4')}>{children}</h2>
}

const WorkDuration = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <p className={cn('text-[15px] text-gray-300')}>{children}</p>
}

const Paragraph = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <p className={cn('text-[15px] font-light')}>{children}</p>
}

const Achievement = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return <p className={cn('text-[15px]')}>{children}</p>
}

export default function CV () {
  return (
    <div className={"flex flex-col gap-1"}>
      <Headline className={'mt-0 text-gray-50'}>Jonas Winnen</Headline>
      <ContactInfo />

      <Headline>SUMMARY</Headline>
      <Paragraph>
        Impact and mission-driven Engineering Manager with over six years of
        extensive experience building and operating digital platforms. Highly
        skilled in enabling teams to design and implement user-centric frontends
        and scalable backend architectures. Experienced in leading
        cross-functional teams to deliver high-quality results on time. Deep
        understanding of business, finance, leadership, and technology, combined
        with an extraordinary ability to navigate and adapt to dynamic
        environments. Excels at aligning technical strategies with organizational
        goals, particularly in remote work environments.
      </Paragraph>

      <Headline>PROFESSIONAL EXPERIENCE</Headline>
      <SubHeadline>Co-Founder and Chief Product Officer</SubHeadline>
      <Paragraph>rareboard.com – Berlin, Germany (remote)</Paragraph>
      <Paragraph>05/2022 - Present</Paragraph>
      <CompanyInfo>
        Rareboard is an NFT marketplace aggregator offering market and rarity
        analysis as well as a secure and gas-efficient trading and minting
        experience on multiple EVM-compatible blockchains.
      </CompanyInfo>

        <ul className={"list-disc pl-8"}>
          <li>
            <Paragraph>
              Led and mentored a team of three senior developers in a remote
              environment, successfully driving the development and delivery of key
              features. Resulting in securing a vital ecosystem grant and achieving a
              300% increase in active users and wallet transactions within a quarter.
            </Paragraph>
          </li>
          <li>
            <Paragraph>
              Directed a major platform redesign focused on technical enhancements,
              including state management, database optimization, caching, and CDN
              strategies. This initiative led to a 90% reduction in page load times and
              a significant increase in user engagement, evidenced by a 40% rise in
              average session duration.
            </Paragraph>
          </li>
        </ul>

      <SubHeadline>Senior Full Stack Developer</SubHeadline>
      <Paragraph>Freelancer – US, EMEA, APAC</Paragraph>
      <WorkDuration>01/2022 - Present</WorkDuration>
      <CompanyInfo>
        Effectively managed and delivered diverse web and blockchain projects
        from inception to launch, providing project management, development, and
        consultative services for global clients across various time zones.
      </CompanyInfo>

      <ul className={"list-disc pl-8"}>
        <li>
          <Paragraph>
            Led the design and implementation for ten dApps for NFT and DeFi projects
            on BSC and Ethereum blockchain, creating secure and intuitive user
            experiences for various use-cases.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Designed and developed a token-gated browser game, blending web and
            blockchain technologies, 3D rendering, and secure data and state management
            into a robust gaming experience.
          </Paragraph>
        </li>
      </ul>





      <SubHeadline>Co-Founder and Chief Technology Officer</SubHeadline>
      <Paragraph>STYNG.com – Berlin and Karlsruhe, Germany</Paragraph>
      <WorkDuration>08/2017 - Present</WorkDuration>
      <CompanyInfo>
        STYNG simplifies the booking process for tattoo professionals, offering
        advanced tools including In-App chat, CRM, calendar and scheduling
        services, email automation, customizable forms, and landing pages.
      </CompanyInfo>

      <ul className={"list-disc pl-8"}>
        <li>
          <Paragraph>
            Led the product department, managing a cross-functional team of up to
            seven developers and UX/UI designers being responsible for the departments
            output and organization.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Implemented agile methodologies to enhance team performance and goal
            setting, leveraging Objectives and Key Results (OKRs), daily stand-ups,
            bi-weekly sprints, kanban based sprint planning, monthly team and quarterly
            one-on-one meetings for feedback.
          </Paragraph>
        </li>

        <li>
          <Paragraph>
            Focused on optimizing product quality and development speed by encouraging
            collaborative practices like pair programming, mob programming, and code
            reviews.
          </Paragraph>
        </li>

        <li>
          <Paragraph>
            Providing reliable and tested software capable of securely handling
            mission-critical processes, generating over €30M in booking revenue for
            more than 1000 B2B clients across Europe.
          </Paragraph>
        </li>

        <li>
          <Paragraph>
            Owned and communicated the product roadmap, delivered product presentations,
            and prepared technical due diligence, while closely collaborating with
            teams and users to build the core platform, enabling the company to raise
            over $500k from business angels and institutional investors.
          </Paragraph>
        </li>
      </ul>




      <Headline>EDUCATION</Headline>
      <SubHeadline>B. Sc. Business Administration and Engineering (focus on digital services)</SubHeadline>
      <Paragraph>University of Applied Science Karlsruhe/Germany</Paragraph>
      <WorkDuration>2014-2019</WorkDuration>

      <SubHeadline>Abitur (equivalent to A-Levels / high school diploma)</SubHeadline>
      <Paragraph>St. Bernhard Gymnasium, Schiefbahn/Germany</Paragraph>
      <WorkDuration>2003-2012</WorkDuration>

      <Headline>BUSINESS AND LEADERSHIP SKILLS</Headline>
      <Paragraph>
        Adaptability, emotional intelligence, effective communication, team building
        and mentoring, conflict resolution, data-driven decision-making, strategic
        planning and execution, project and risk management, and allocation of
        resources
      </Paragraph>

      <Headline>TECHNICAL SKILLS</Headline>
      <Paragraph>
        JavaScript (ES6+), TypeScript, React, Angular, Next.js, State Management,
        Bundlers, PWA, SPA, SSR, SSG, Node.js, Express, NestJS, REST APIs, MySQL,
        Postgres, MongoDB, GraphQL, Mongoose, Prisma, Caching, AWS, GCP, Serverless,
        Docker, Kubernetes, CI/CD Pipelines, DNS, Load Balancing, Scaling, Monitoring,
        Logging, Web3.js, ethers.js, Smart Contracts, DeFi, NFTs, IPFS, Solidity,
        Oracles, Wallets, general blockchain concepts, performance and security best
        practices
      </Paragraph>

      <Headline>LANGUAGES</Headline>
      <Paragraph>German (native), English (fluent, C1), French (intermediate, A2)</Paragraph>

      <Headline>ACHIEVEMENTS</Headline>

      <ul className="list-disc pl-8">
        <li><Achievement>500+ code reviews,</Achievement></li>
        <li><Achievement>80+ user test sessions,</Achievement></li>
        <li><Achievement>50+ technical interviews,</Achievement></li>
        <li><Achievement>Hired 13 software engineers and three UX/UI designers,</Achievement></li>
        <li><Achievement>BNB Chain MVB 5 Alumni,</Achievement></li>
        <li><Achievement>CyberLab Tech Incubator Alumni,</Achievement></li>
        <li><Achievement>Built a B2B-SaaS platform,</Achievement></li>
        <li><Achievement>Built a NFT Marketplace aggregator,</Achievement></li>
        <li><Achievement>Built a web3 browser game,</Achievement></li>
        <li><Achievement>Spoke at Startup Events</Achievement></li>
      </ul>
    </div>
  )
}