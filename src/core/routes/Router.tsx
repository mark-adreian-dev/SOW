import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "../presentation/components/custom/Loader/LoadingSpinner";
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
        <Route index element={<StatementOfWorkPage />} />
      </Routes>
    </Suspense>
  );
};
