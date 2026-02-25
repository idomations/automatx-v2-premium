"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuestionnaireForm } from "@/components/forms/questionnaire-form";
import { cn } from "@/lib/cn";

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  if (!bookingId) {
    return (
      <div className="text-center py-12">
        <h3
          className={cn(
            "text-2xl font-bold mb-2",
            "text-light-text dark:text-dark-text"
          )}
        >
          שאלון לא נמצא
        </h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          נראה שהגעת לכאן בלי מזהה פגישה. אנא קבע פגישה קודם.
        </p>
      </div>
    );
  }

  return <QuestionnaireForm bookingId={bookingId} />;
}

export function QuestionnairePageContent() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            טוען...
          </p>
        </div>
      }
    >
      <QuestionnaireContent />
    </Suspense>
  );
}

