// The two backends name ids differently: Express (MongoDB) sends `_id`,
// Nest (PostgreSQL) sends `id`. Read ids through this helper so a screen
// works with whichever backend is selected.
export type WithId = { _id?: string; id?: string } | null | undefined;

export function idOf(entity: WithId): string {
  return entity?._id ?? entity?.id ?? "";
}
