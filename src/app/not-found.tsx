import { redirect } from "next/navigation";

/**
 * Root 404 — redirect to default locale not found
 */
export default function RootNotFound() {
  redirect("/en");
}
