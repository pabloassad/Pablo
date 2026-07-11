import { PageVeil } from "@/components/ui/PageVeil";

// Re-mounts on every route change → the veil plays between the two spaces.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageVeil>{children}</PageVeil>;
}
