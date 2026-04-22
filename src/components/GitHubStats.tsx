import { Code2, GitBranch, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface LanguageEntry {
  language: string;
  count: number;
}

interface GitHubStatsProps {
  totalRepos: number;
  totalStars: number;
  topLanguages: LanguageEntry[];
}

interface StatItemProps {
  label: string;
  value: number;
  Icon: typeof Star;
}

function StatItem({ label, value, Icon }: StatItemProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 py-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold tracking-tight">{value.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-muted p-3 text-primary">
          <Icon className="size-5" aria-hidden />
        </div>
      </CardContent>
    </Card>
  );
}

export default function GitHubStats({ totalRepos, totalStars, topLanguages }: GitHubStatsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatItem label="repositories" value={totalRepos} Icon={GitBranch} />
        <StatItem label="total stars" value={totalStars} Icon={Star} />
        <StatItem label="languages" value={topLanguages.length} Icon={Code2} />
      </div>

      {topLanguages.length > 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">top languages</p>
          <ul className="flex flex-wrap gap-2">
            {topLanguages.slice(0, 6).map((entry) => (
              <li key={entry.language}>
                <Badge variant="secondary" className="gap-2 font-normal">
                  {entry.language}
                  <span className="text-muted-foreground">{entry.count}</span>
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
