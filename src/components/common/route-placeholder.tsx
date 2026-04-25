type RoutePlaceholderProps = {
  title: string;
  description?: string;
};

export function RoutePlaceholder({ title, description }: RoutePlaceholderProps) {
  return (
    <main className="p-6">
      <p className="text-sm uppercase tracking-wide text-gray-500">Route scaffold</p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-950">{title}</h1>
      {description ? <p className="mt-2 text-gray-700">{description}</p> : null}
    </main>
  );
}