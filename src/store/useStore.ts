import { create } from "zustand";
import {
  // Entity,
  Contact,
  // Mission,
  // Opportunity,
  // FidelizationAction,
  // User,
  // DashboardData,
} from "../types";

interface AppState {
  // Données
  // entities: Entity[];
  contacts: Contact[];
  // missions: Mission[];
  // opportunities: Opportunity[];
  // fidelizationActions: FidelizationAction[];
  // users: User[];
  // dashboardData: DashboardData | null;

  // UI State
  // currentUser: User | null;
  // selectedEntity: Entity | null;
  isLoading: boolean;

  // Actions
  // setCurrentUser: (user: User) => void;
  // setSelectedEntity: (entity: Entity | null) => void;
  setLoading: (loading: boolean) => void;

  // // Entity actions
  // addEntity: (entity: Omit<Entity, "id" | "createdAt" | "updatedAt">) => void;
  // updateEntity: (id: string, updates: Partial<Entity>) => void;
  // deleteEntity: (id: string) => void;

  // Contact actions
  addContact: (contact: Omit<Contact, "id" | "createdAt">) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;

  // // Mission actions
  // addMission: (mission: Omit<Mission, "id" | "createdAt">) => void;
  // updateMission: (id: string, updates: Partial<Mission>) => void;

  // // Opportunity actions
  // addOpportunity: (opportunity: Omit<Opportunity, "id" | "createdAt">) => void;
  // updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;

  // Fidelization actions
  // addFidelizationAction: (
  //   action: Omit<FidelizationAction, "id" | "createdAt">
  // ) => void;
  // updateFidelizationAction: (
  //   id: string,
  //   updates: Partial<FidelizationAction>
  // ) => void;

  // // Utility functions
  // calculateScore: (entity: Omit<Entity, "score">) => number;
  // getEntitiesByStatus: (status: Entity["status"]) => Entity[];
  // getContactsByEntity: (entityId: string) => Contact[];
  // getMissionsByEntity: (entityId: string) => Mission[];
  // getOpportunitiesByEntity: (entityId: string) => Opportunity[];
}

// Fonction de calcul du score selon le cahier des charges
// const calculateEntityScore = (entity: Omit<Entity, "score">): number => {
//   let score = 0;

//   // CA (40%)
//   if (entity.revenue >= 100_000_000) score += 40; // > 100M FCFA
//   else if (entity.revenue >= 50_000_000) score += 30; // 50-100M FCFA
//   else if (entity.revenue >= 10_000_000) score += 20; // 10-50M FCFA
//   else score += 10; // < 10M FCFA

//   // Effectifs (30%)
//   if (entity.employees >= 100) score += 30; // > 100 employés
//   else if (entity.employees >= 50) score += 25; // 50-100 employés
//   else if (entity.employees >= 20) score += 20; // 20-50 employés
//   else if (entity.employees >= 10) score += 15; // 10-20 employés
//   else score += 10; // < 10 employés

//   // Besoins détectés (30%) - Simplifié pour le moment
//   if (entity.status === "client") score += 30;
//   else if (entity.status === "qualified") score += 20;
//   else score += 10;

//   return Math.min(100, score);
// };

// Données de démonstration
// const mockEntities: Entity[] = [
//   {
//     id: "1",
//     ifu: "1234567890",
//     rccm: "BF-OUA-2023-A-001",
//     name: "SONABEL SA",
//     sector: "Énergie",
//     status: "client",
//     revenue: 150_000_000,
//     employees: 250,
//     location: { address: "Ouagadougou, Burkina Faso" },
//     score: 0,
//     createdAt: new Date("2024-01-15"),
//     updatedAt: new Date("2024-12-01"),
//   },
//   {
//     id: "2",
//     ifu: "0987654321",
//     rccm: "BF-OUA-2023-B-002",
//     name: "Orange Burkina Faso",
//     sector: "Télécoms",
//     status: "qualified",
//     revenue: 80_000_000,
//     employees: 180,
//     location: { address: "Ouagadougou, Burkina Faso" },
//     score: 0,
//     createdAt: new Date("2024-02-10"),
//     updatedAt: new Date("2024-11-28"),
//   },
//   {
//     id: "3",
//     ifu: "1122334455",
//     rccm: "BF-OUA-2023-C-003",
//     name: "Banque Atlantique Burkina",
//     sector: "Banque",
//     status: "prospect",
//     revenue: 45_000_000,
//     employees: 95,
//     location: { address: "Ouagadougou, Burkina Faso" },
//     score: 0,
//     createdAt: new Date("2024-03-05"),
//     updatedAt: new Date("2024-12-15"),
//   },
// ];

const mockContacts: Contact[] = [
  {
    id: "1",
    entityId: "1",
    name: "Amadou Traoré",
    role: "Directeur Général",
    email: "a.traore@sonabel.bf",
    phone: "+226 70 12 34 56",
    whatsapp: "+226 70 12 34 56",
    isPrimary: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    entityId: "2",
    name: "Marie Ouédraogo",
    role: "Directrice Financière",
    email: "m.ouedraogo@orange.bf",
    phone: "+226 71 23 45 67",
    isPrimary: true,
    createdAt: new Date("2024-02-10"),
  },
];

// const mockUser: User = {
//   id: "1",
//   name: "Jean Sawadogo",
//   email: "j.sawadogo@fidalli.bf",
//   role: "admin",
//   department: "DG",
//   isActive: true,
//   lastLogin: new Date(),
// };

export const useStore = create<AppState>((set) => ({
  // État initial
  // entities: mockEntities.map((entity) => ({
  //   ...entity,
  //   score: calculateEntityScore(entity),
  // })),
  contacts: mockContacts,
  // missions: [],
  // opportunities: [],
  // fidelizationActions: [],
  // users: [mockUser],
  // dashboardData: null,
  // currentUser: mockUser,
  selectedEntity: null,
  isLoading: false,

  // Actions UI
  // setCurrentUser: (user) => set({ currentUser: user }),
  // setSelectedEntity: (entity) => set({ selectedEntity: entity }),
  setLoading: (loading) => set({ isLoading: loading }),

  // Actions Entity
  // addEntity: (entityData) => {
  //   const id = Date.now().toString();
  //   const createdAt = new Date();
  //   const updatedAt = new Date();
  //   const entity: Entity = {
  //     ...entityData,
  //     id,
  //     createdAt,
  //     updatedAt,
  //     score: calculateEntityScore({
  //       ...entityData,
  //       id,
  //       createdAt,
  //       updatedAt,
  //     }),
  //   };
  //   set((state) => ({ entities: [...state.entities, entity] }));
  // },

  // updateEntity: (id, updates) => {
  //   set((state) => ({
  //     entities: state.entities.map((entity) => {
  //       if (entity.id === id) {
  //         const updated = { ...entity, ...updates, updatedAt: new Date() };
  //         return { ...updated, score: calculateEntityScore(updated) };
  //       }
  //       return entity;
  //     }),
  //   }));
  // },

  // deleteEntity: (id) => {
  //   set((state) => ({
  //     entities: state.entities.filter((entity) => entity.id !== id),
  //     contacts: state.contacts.filter((contact) => contact.entityId !== id),
  //     missions: state.missions.filter((mission) => mission.entityId !== id),
  //     opportunities: state.opportunities.filter((opp) => opp.entityId !== id),
  //   }));
  // },

  // Actions Contact
  addContact: (contactData) => {
    const contact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    set((state) => ({ contacts: [...state.contacts, contact] }));
  },

  updateContact: (id, updates) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updates } : contact
      ),
    }));
  },

  deleteContact: (id) => {
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  },

  // Actions Mission
  // addMission: (missionData) => {
  //   const mission: Mission = {
  //     ...missionData,
  //     id: Date.now().toString(),
  //     createdAt: new Date(),
  //   };
  //   set((state) => ({ missions: [...state.missions, mission] }));
  // },

  // updateMission: (id, updates) => {
  //   set((state) => ({
  //     missions: state.missions.map((mission) =>
  //       mission.id === id ? { ...mission, ...updates } : mission
  //     ),
  //   }));
  // },

  // Actions Opportunity
  // addOpportunity: (opportunityData) => {
  //   const opportunity: Opportunity = {
  //     ...opportunityData,
  //     id: Date.now().toString(),
  //     createdAt: new Date(),
  //   };
  //   set((state) => ({ opportunities: [...state.opportunities, opportunity] }));
  // },

  // updateOpportunity: (id, updates) => {
  //   set((state) => ({
  //     opportunities: state.opportunities.map((opp) =>
  //       opp.id === id ? { ...opp, ...updates } : opp
  //     ),
  //   }));
  // },

  // // Actions Fidelization
  // addFidelizationAction: (actionData) => {
  //   const action: FidelizationAction = {
  //     ...actionData,
  //     id: Date.now().toString(),
  //     createdAt: new Date(),
  //   };
  //   set((state) => ({
  //     fidelizationActions: [...state.fidelizationActions, action],
  //   }));
  // },

  // updateFidelizationAction: (id, updates) => {
  //   set((state) => ({
  //     fidelizationActions: state.fidelizationActions.map((action) =>
  //       action.id === id ? { ...action, ...updates } : action
  //     ),
  //   }));
  // },

  // // Fonctions utilitaires
  // calculateScore: calculateEntityScore,

  // getEntitiesByStatus: (status) => {
  //   return get().entities.filter((entity) => entity.status === status);
  // },

  // getContactsByEntity: (entityId) => {
  //   return get().contacts.filter((contact) => contact.entityId === entityId);
  // },

  // getMissionsByEntity: (entityId) => {
  //   return get().missions.filter((mission) => mission.entityId === entityId);
  // },

  // getOpportunitiesByEntity: (entityId) => {
  //   return get().opportunities.filter((opp) => opp.entityId === entityId);
  // },
}));
