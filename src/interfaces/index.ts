import React from "react";

export interface IDockItem {
  name: string;
  src: string;
  active: boolean;
  id: string;
}

export interface IMacWindow {
  position: { x: number; y: number };
  size: { width: number; height: number };
  title: string;
  id: string;
  isMaximized: boolean;
  isMinimized: boolean;
}

export interface IDesktopItem {
  position: { x: number; y: number };
  size: { width: number; height: number };
  name: string;
  id: string;
  image?: string;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ICorner {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface IDelta {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface IDimension {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface IDockItemDimension {
  height: number;
  width: number;
}

export interface IHeaderIconItem {
  className: string;
  icon: React.ReactNode;
  id: string;
}

export type StepValue =
  | "idle"
  | "loading"
  | "login"
  | "success"
  | "error"
  | "loggingIn";

export interface IStep {
  value: StepValue;
  label: string;
  duration: number;
}

export interface ChildrenAndClassName {
  children: React.ReactNode;
  className?: string;
}

export interface IJobItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  list: string[];
}

export interface IJobSection {
  name: string;
  items: IJobItem[];
}

export interface AuthToken {
  exp: number;
  data: {
    userId: string;
    messageId: string;
    address: string;
  };
  iat: number;
}

export interface User {
  address: string;
}

export interface UserWithId extends User {
  _id: number;
}

import { ObjectId } from "bson";

export interface Message {
  address: string;
  message: string;
  timestamp: number;
  uId: string;
  signature?: string;
}

export interface MessageWithId extends Message {
  _id: ObjectId;
}

export interface APIResponse {
  result: any;
  error: any;
  endpoint: string;
}
