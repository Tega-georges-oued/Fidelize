// Types principaux pour le CRM Fidalli

export interface Entity {
  id: string;
  companyName: string;
  nif?: string;
  sector: string;
  region: string;
  parentOrganization?: string; // Tutelle/Holding/Groupe/Ministère
  revenue?: number;
  employees?: number;
  status: "client" | "prospect";
  priority: "low" | "medium" | "high" | "critical";
  score: number;
  contactsCount?: number;
  missionsCount?: number;
  address: Address;
  legalInfo: LegalInfo;
  createdAt: Date;
  updatedAt: Date;
  lastInteraction?: Date;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface LegalInfo {
  legalForm: string;
  registrationNumber?: string;
  vatNumber?: string;
  documents: Document[];
}

// export interface Contact {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   whatsapp?: string;
//   linkedin?: string;
//   position: string;
//   role: "decision_maker" | "influencer" | "gatekeeper" | "user";
//   entityId: string;
//   professionalHistory: ProfessionalExperience[];
//   tags: string[];
//   interactions: Interaction[];
//   createdAt: Date;
//   updatedAt: Date;
//}

export interface Contact {
  id: string;
  entityId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp?: string;
  isPrimary: boolean;
  createdAt: Date;
}

export interface ProfessionalExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface Mission {
  id: string;
  title: string;
  type: "audit_legal" | "pca" | "formation" | "attestation" | "other";
  entityId: string;
  status: "draft" | "active" | "completed" | "archived" | "cancelled";
  startDate: Date;
  endDate?: Date;
  budget: number;
  actualCost?: number;
  profitability?: number;
  description: string;
  activities: Activity[];
  tasks: Task[];
  documents: Document[];
  timesheets: Timesheet[];
  milestones: Milestone[];
  assignedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  missionId: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "blocked";
  assignedTo: string;
  startDate: Date;
  endDate?: Date;
  dependencies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  activityId?: string;
  missionId: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timesheet {
  id: string;
  missionId: string;
  taskId?: string;
  userId: string;
  date: Date;
  hours: number;
  description: string;
  billable: boolean;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
}

export interface Milestone {
  id: string;
  missionId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed" | "overdue";
  deliverables: string[];
  completedAt?: Date;
}

export interface Opportunity {
  id: string;
  title: string;
  entityId: string;
  type: "spontaneous" | "tender" | "referral";
  stage:
    | "prospection"
    | "qualified"
    | "proposal"
    | "negotiation"
    | "won"
    | "lost";
  value: number;
  probability: number;
  expectedCloseDate: Date;
  description: string;
  competitors?: string[];
  documents: Document[];
  activities: OpportunityActivity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OpportunityActivity {
  id: string;
  opportunityId: string;
  type: "call" | "email" | "meeting" | "proposal" | "follow_up";
  description: string;
  date: Date;
  userId: string;
  outcome?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  version: number;
  entityId?: string;
  missionId?: string;
  opportunityId?: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
}

export interface Interaction {
  id: string;
  type: "call" | "email" | "meeting" | "visit" | "sms" | "whatsapp";
  subject: string;
  description: string;
  date: Date;
  duration?: number;
  entityId?: string;
  contactId?: string;
  userId: string;
  outcome?: string;
  followUpRequired: boolean;
  followUpDate?: Date;
  attachments: string[];
}

export interface NeedsAnalysis {
  id: string;
  entityId: string;
  analysisDate: Date;
  sourceDocuments: string[];
  identifiedNeeds: IdentifiedNeed[];
  recommendations: Recommendation[];
  score: number;
  status: "pending" | "reviewed" | "approved" | "implemented";
  reviewedBy?: string;
  reviewedAt?: Date;
}

export interface IdentifiedNeed {
  service:
    | "cac"
    | "audit_internal"
    | "audit_external"
    | "pca"
    | "formation"
    | "other";
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  estimatedValue?: number;
  timeline?: string;
  confidence: number;
}

export interface Recommendation {
  id: string;
  needId: string;
  serviceType: string;
  description: string;
  estimatedCost: number;
  timeline: string;
  resources: string[];
  status: "draft" | "sent" | "accepted" | "rejected";
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role:
    | "super_admin"
    | "director"
    | "mission_manager"
    | "consultant"
    | "commercial"
    | "support"
    | "readonly";
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface Permission {
  module: string;
  actions: ("create" | "read" | "update" | "delete")[];
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target?: number;
  unit: string;
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  trend: "up" | "down" | "stable";
  lastUpdated: Date;
}

export interface Alert {
  id: string;
  type:
    | "mission_overdue"
    | "opportunity_stagnant"
    | "budget_exceeded"
    | "contract_expiring";
  severity: "info" | "warning" | "error" | "critical";
  title: string;
  description: string;
  entityId?: string;
  missionId?: string;
  opportunityId?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  type: "email" | "sms" | "whatsapp";
  subject?: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunicationSequence {
  id: string;
  name: string;
  trigger: "mission_completed" | "opportunity_lost" | "manual" | "scheduled";
  steps: CommunicationStep[];
  isActive: boolean;
}

export interface CommunicationStep {
  id: string;
  sequenceId: string;
  order: number;
  delay: number; // en jours
  templateId: string;
  conditions?: string[];
}

export interface SearchFilters {
  query?: string;
  entityType?: "client" | "prospect";
  sector?: string;
  region?: string;
  revenueMin?: number;
  revenueMax?: number;
  employeesMin?: number;
  employeesMax?: number;
  priority?: string;
  scoreMin?: number;
  scoreMax?: number;
  lastInteractionFrom?: Date;
  lastInteractionTo?: Date;
}

export interface DashboardConfig {
  userId: string;
  widgets: DashboardWidget[];
  layout: "grid" | "list";
  refreshInterval: number;
}

export interface DashboardWidget {
  id: string;
  type: "kpi" | "chart" | "table" | "alert";
  title: string;
  size: "small" | "medium" | "large";
  position: { x: number; y: number };
  config: Record<string, unknown>;
}
