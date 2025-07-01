import { FC } from "react";

type SectionHeaderProps = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
};

export const SectionHeader: FC<SectionHeaderProps> = ({ title, icon: Icon, description }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      {description && (
        <p className="text-gray-600 text-base">{description}</p>
      )}
    </div>
  </div>
);