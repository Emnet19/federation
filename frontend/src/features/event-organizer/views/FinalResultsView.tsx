"use client";

import { Trophy } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { EmptyState } from "../components/EmptyState";
import { FinalResultCard } from "../components/FinalResultCard";
import { useFinalResults } from "../hooks/useFinalResults";
import type { FinalResultEvent } from "../types";
import { exportResultsAsExcel, exportResultsAsPdf, printResults } from "../utils/export";

export default function FinalResultsView() {
  const { results, isLoading, error } = useFinalResults();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E6A500]/40 bg-[#FFF3CC] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#B8860B] dark:border-yellow-500/30 dark:bg-[#E6A500]/15 dark:text-yellow-400">
            <Trophy className="h-3.5 w-3.5" />
            Official Results
          </span>
        }
        title="Final Results"
        subtitle="Official World Athletics-compliant result cards for completed events."
      />

      {error ? (
        <EmptyState title="Results unavailable" description={error} />
      ) : isLoading ? (
        <LoadingSkeleton rows={4} />
      ) : results.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No results published yet"
          description="Completed competition results will appear here once ratified by the federation."
        />
      ) : (
        <div className="space-y-6">
          {results.map((result, index) => (
            <FinalResultCard
              key={result.id}
              result={result}
              index={index}
              onExportPdf={(event: FinalResultEvent) => exportResultsAsPdf(event)}
              onExportExcel={(event: FinalResultEvent) => exportResultsAsExcel(event)}
              onPrint={(event: FinalResultEvent) => printResults(event)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
