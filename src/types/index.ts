export * from "./database.types";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles?: string[];
}
