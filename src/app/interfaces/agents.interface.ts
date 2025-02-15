export interface Audit {
  action: string;
  details: string;
  time: string;
}
export interface Audits {
  agents: Audit[];
}
