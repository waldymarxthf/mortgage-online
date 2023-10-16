import { WarningOctagonIcon } from "~shared/icons";

export function ErrorAlert({ text }: { text: string | boolean }) {
  return (
    <div className="relative mt-3 flex min-h-30 w-input flex-col justify-center rounded-md bg-error px-8 py-2 text-xs">
      <WarningOctagonIcon className="absolute left-3 top-2" />
      {text}
    </div>
  );
}
