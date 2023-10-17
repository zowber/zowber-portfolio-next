import { CaseStudy } from "./types";

export async function All() {
  const res = await fetch(process.env.DATA_HOST + "/portfolioItems.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function One(id: number) {
  const res = await fetch(process.env.DATA_HOST + "/" + id + ".json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
