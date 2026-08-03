import { createElement } from "react";
import type { ReactElement } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import {
  CalendarDays,
  Plus,
  Radio,
  Trophy,
} from "lucide-react";

const iconRegistry: Record<string, LucideIcon> = {
  plus: Plus,
  "calendar-days": CalendarDays,
  radio: Radio,
  trophy: Trophy,
};

export function getIcon(name: string, props: LucideProps = {}): ReactElement {
  const Icon = iconRegistry[name] ?? CalendarDays;
  return createElement(Icon, props);
}
