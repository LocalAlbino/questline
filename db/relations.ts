import { authRelations } from "./auth-schema";

// Merge relation parts here as app tables gain relations (e.g. via defineRelationsPart).
export const relations = {
  ...authRelations,
};
