import Link from 'next/link';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
}

export function NavigationCard({ title, description, href }: NavigationCardProps) {
  
  return (
    <Link
      href={href}
      className="group rounded-lg border border-gray-200 dark:border-gray-800 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          →
        </span>
      </h2>
      <p className="max-w-[30ch] text-sm opacity-50">{description}</p>
    </Link>
  );
} 