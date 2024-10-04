import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypographyH1, TypographyP } from "@/components/typography";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="mb-5">
        <TypographyH1 text="Welcome" />
        <TypographyP text="Click the button to open Todo App" />
      </div>
      <Button asChild variant={"default"}>
        <Link href="/todo">Open</Link>
      </Button>
    </div>
  );
}
