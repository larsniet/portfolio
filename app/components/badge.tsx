interface BadgeProps {
  icon?: React.ReactNode;
  text: string;
}

export default function Badge({ icon, text }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-x-1.5 h-6 rounded-md bg-gray-100 px-2 py-[3px] text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
      {icon}
      {text}
    </span>
  );
}
