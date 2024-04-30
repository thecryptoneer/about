import {
  BatteryIcon,
  ControlIcon,
  GitHubIcon,
  SearchIcon,
  SiriIcon,
  VolIcon,
  WifiIcon,
} from "@/components/icons";
import { githubUrl } from "../../../config";
import { IHeaderIconItem } from "@/interfaces";

export const leftItems: string[] = [
  "File",
  "Edit",
  "View",
  "Terminal",
  "Window",
  "Help",
];

export const rightItems: IHeaderIconItem[] = [
  {
    className: "github",
    icon: (
      <a
        title="GitHub Icon"
        href={githubUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <GitHubIcon />
      </a>
    ),
    id: "github",
  },
  {
    className: "vol",
    icon: <VolIcon />,
    id: "vol",
  },
  {
    className: "",
    id: "battery",
    icon: <BatteryIcon />,
  },
  {
    className: "wifi",
    icon: <WifiIcon />,
    id: "wifi",
  },
  {
    className: "search",
    icon: <SearchIcon />,
    id: "search",
  },
  {
    className: "",
    id: "control",
    icon: <ControlIcon />,
  },
  {
    className: "",
    id: "siri",
    icon: <SiriIcon />,
  },
];
