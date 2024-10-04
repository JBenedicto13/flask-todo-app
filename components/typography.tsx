export function TypographyH1({ text }: { text: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  );
}

export function TypographyP({ text }: { text: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>;
}
