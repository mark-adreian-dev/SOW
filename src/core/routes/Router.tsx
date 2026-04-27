import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "../presentation/components/custom/Loader/LoadingSpinner";
import WorkspaceLayout from "../presentation/layout/WorkspaceLayout";
const StatementOfWorkPage = lazy(() => import("@/features/StatementOfWork/page/StatementOfWorkPage"));

export const Router = () => {
  return (
    /* Suspense provides a fallback UI while the lazy components are being fetched */
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route element={<WorkspaceLayout />}>
          <Route index element={<StatementOfWorkPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
