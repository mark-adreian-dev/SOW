import type { StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import DocumentBackground from "@/core/presentation/assets/DocumentBacgkround.png";
import ReactDOM from "react-dom/client";
import { type ReactNode, useMemo, } from "react";
import { formatDate } from "@/core/helpers/formatDate";
import ScrumDiagram from "@/core/presentation/assets/ScrumDiagram.png";
interface SOWPreviewProps {
  data: StatementOfWorkRequest;
}

export default function SOWPreview({ data }: SOWPreviewProps) {
  const blocks = [
    // PAGE 1 CONTENT
    [
      <div className="flex items-start justify-center w-full h-full flex-col mt-50">
        <h1 className="text-[138px] leading-37.5 font-bold text-blue-800">SOW</h1>
        <h2 className="text-muted-foreground text-[23.3327px]">{data.project_name ?? ""}</h2>
        <p className="text-muted-foreground mt-10  text-[23.3327px]">Date: {data.submission_date ? formatDate(data.submission_date, "long") : ""}</p>
      </div>,
    ],

    // PAGE 2
    [
      <div>
        <h2 className="text-[21.9994px] font-semibold ">Statement of Work:</h2>
        <p className="text-[13.9996px]">
          This Statement of Work (SOW) has an effective date of {data.start_date ? formatDate(data.start_date, "long") : ""} and describes the
          services to be performed by OPSOLUTIONS for {data.client_name}.
        </p>
        <div className="mt-6 text-[13.9996px]">
          <p>
            <strong>Client:</strong> {data.client_name ?? ""}
          </p>
          <p>
            <strong>Project Name:</strong> {data.project_name ?? ""}
          </p>
          <p>
            <strong>Prepared by:</strong> {data.prepared_by ?? ""}
          </p>
          <p>
            <strong>Noted by:</strong> {data.noted_by ?? ""}
          </p>
        </div>
      </div>,
    ],
    [
      <div className="flex flex-col gap-4">
        <h1 className="w-full text-center text-[21.9994px]">Introduction</h1>

        <h3 className="text-[13.9996px] font-semibold">Project Background</h3>
        <p className="text-[13.9996px]">
          This is the Project Background. Give a brief context. Describe the problem / opportunity. Mention stakeholders involved, initiators /
          requestors. Mention related / past work if any. This document describes the development and services done by OPSOLUTIONS in the completion
          of {data.project_name}.
        </p>
        <h2 className="font-semibold text-[13.9996px]">Project Objectives</h2>

        <ul className="list-decimal ml-6 space-y-1">
          {data.objectives?.map((obj, i) => (
            <li key={i} className="text-[13.9996px]">
              {obj.detail}
            </li>
          )) ?? null}
        </ul>
      </div>,
    ],
    [
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="font-semibold text-[13.9996px]">Geographical Scope</h2>
          <p>Scope of Work will only cover project support for the following countries: </p>
          <ul className="list-disc ml-6">{data.countries?.map((c, i) => <li key={i}>{c.detail}</li>) ?? null}</ul>
        </div>
        <div>
          <h2 className="font-semibold text-[13.9996px]">Project Approach</h2>

          <p>
            The team will be using the Scrum Agile approach. Please refer to the figure below. OPSOLUTIONS is using scrum methodology for managing
            software delivery. Scrum is a methodology used by the organization to break down requirements into manageable chunks by collaborating and
            communicating both with the people who are doing the work and the people who need the work done.
          </p>
          <p className="my-5">Scrum Agile Approach diagram:</p>
          <img src={ScrumDiagram} className="w-[3.66in] h-[1.67in] mx-auto" />
          <p>Scrum Project Management Activities: </p>
          <ul className="pl-10 list-disc">
            <li>
              Sprint Planning Meeting – This is where the scrum team discusses the work that will be done per sprint. The product backlog is being
              created containing the level of priorities of each task.
            </li>
            <li>
              Daily Scrum or Daily Stand-up – This occurs every day wherein the team gathers to discuss what they have done yesterday, what they are
              currently working on and what is their next task.
            </li>
            <li>Sprint Review – At the end of every sprint, the scrum team discusses what they have and have not accomplished during the sprint.</li>
            <li>
              Sprint Demo – This is where the completed product backlog items are demonstrated with the goal of promoting an information discussion
              between the Scrum Team and Sprint Review participants.
            </li>
            <li>
              Sprint Retrospective – This is where the team gathers and discusses what they have learned, the challenges they have experienced, and
              the things that they should work on to improve their next sprint.
            </li>
            <li>Backlog Refinement – This is where the team discusses the list of items and tasks that aim to be covered by the next sprint.</li>
          </ul>
        </div>
      </div>,
    ],
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-2 bg-gray-200">
      <PaginatedPreview blocks={blocks} />
    </div>
  );
}



const PAGE_HEIGHT = 849.6;
const PAGE_WIDTH = 656.84;
const PAGE_PADDING_Y = 200;

const CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_Y;

interface PaginatedPreviewProps {
  blocks: ReactNode[][];
}

export const PaginatedPreview = ({ blocks }: PaginatedPreviewProps) => {
  const pages = useMemo(() => {
    if (typeof window === "undefined") return [];

    const container = document.createElement("div");

    container.style.position = "fixed";
    container.style.left = "-99999px";
    container.style.top = "0";
    container.style.width = `${PAGE_WIDTH - 92}px`;
    container.style.padding = "100px 46px";
    container.style.boxSizing = "border-box";

    document.body.appendChild(container);

    const measure = (node: ReactNode) => {
      const el = document.createElement("div");
      el.style.width = "100%";

      container.appendChild(el);

      const root = ReactDOM.createRoot(el);
      root.render(<div className="block">{node}</div>);

      // 🔥 FORCE browser layout
      const height = el.getBoundingClientRect().height;

      container.removeChild(el);

      return height;
    };

    const newPages: ReactNode[][] = [];

    blocks.forEach((block) => {
      let currentPage: ReactNode[] = [];
      let currentHeight = 0;

      block.forEach((chunk) => {
        const height = measure(chunk);

        if (currentHeight + height > CONTENT_HEIGHT) {
          if (currentPage.length) newPages.push(currentPage);

          currentPage = [chunk];
          currentHeight = height;
        } else {
          currentPage.push(chunk);
          currentHeight += height;
        }
      });

      if (currentPage.length) newPages.push(currentPage);
    });

    document.body.removeChild(container);

    return newPages;
  }, [blocks]);

  return (
    <>
      {pages.map((page, i) => (
        <PreviewPage key={i}>
          {page.map((chunk, j) => (
            <div key={j} className="mb-2">
              {chunk}
            </div>
          ))}
        </PreviewPage>
      ))}
    </>
  );
};


const PreviewPage = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="page text-[13.9996px]"
      style={{
        backgroundImage: `url(${DocumentBackground})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      {children}
    </div>
  );
};



// <div className="flex flex-col w-full items-center gap-6 py-2 bg-gray-200 ">
//   {/* PAGE 1 */}
//   <PreviewPage>
//     <div className="flex items-start justify-center w-full h-full flex-col -translate-y-20">
//       <h1 className="text-[138px] leading-37.5 font-bold text-blue-800">SOW</h1>
//       <h2 className="text-muted-foreground text-[23.3327px]">{data.project_name ?? ""}</h2>
//       <p className="text-muted-foreground mt-10  text-[23.3327px]">Date: {data.submission_date ? formatDate(data.submission_date, "long") : ""}</p>
//     </div>
//   </PreviewPage>

//   {/* PAGE 2 */}
//   <PreviewPage>
//     <h2 className="text-[21.9994px] font-semibold ">Statement of Work:</h2>
//     <p className="text-[13.9996px]">
//       This Statement of Work (SOW) has an effective date of {data.start_date ? formatDate(data.start_date, "long") : ""} and describes the services to
//       be performed by OPSOLUTIONS for {data.client_name}.
//     </p>
//     <div className="mt-6 text-[13.9996px]">
//       <p>
//         <strong>Client:</strong> {data.client_name ?? ""}
//       </p>
//       <p>
//         <strong>Project Name:</strong> {data.project_name ?? ""}
//       </p>
//       <p>
//         <strong>Prepared by:</strong> {data.prepared_by ?? ""}
//       </p>
//       <p>
//         <strong>Noted by:</strong> {data.noted_by ?? ""}
//       </p>
//     </div>
//   </PreviewPage>

//   {/* PAGE 3 */}
//   <PreviewPage>
//     <div className="flex flex-col gap-4">
//       <h1 className="w-full text-center text-[21.9994px]">Introduction</h1>

//       <h3 className="text-[13.9996px] font-semibold">Project Background</h3>
//       <p className="text-[13.9996px]">
//         This is the Project Background. Give a brief context. Describe the problem / opportunity. Mention stakeholders involved, initiators /
//         requestors. Mention related / past work if any. This document describes the development and services done by OPSOLUTIONS in the completion of{" "}
//         {data.project_name}.
//       </p>
//       <h2 className="font-semibold text-[13.9996px]">Project Objectives</h2>

//       <ul className="list-decimal ml-6 space-y-1">
//         {data.objectives?.map((obj, i) => (
//           <li key={i} className="text-[13.9996px]">
//             {obj.detail}
//           </li>
//         )) ?? null}
//       </ul>
//     </div>
//   </PreviewPage>

//   {/* PAGE 4 */}
//   <PreviewPage>
//     <div className="flex flex-col gap-5">
//       <div>
//         <h2 className="font-semibold text-[13.9996px]">Geographical Scope</h2>
//         <p>Scope of Work will only cover project support for the following countries: </p>
//         <ul className="list-disc ml-6">{data.countries?.map((c, i) => <li key={i}>{c.detail}</li>) ?? null}</ul>
//       </div>
//       <div>
//         <h2 className="font-semibold text-[13.9996px]">Project Approach</h2>
//         <p>
//           The team will be using the Scrum Agile approach. Please refer to the figure below. OPSOLUTIONS is using scrum methodology for managing
//           software delivery. Scrum is a methodology used by the organization to break down requirements into manageable chunks by collaborating and
//           communicating both with the people who are doing the work and the people who need the work done.
//         </p>
//         <p className="my-5">Scrum Agile Approach diagram:</p>
//         <img src={ScrumDiagram} className="w-[3.66in] h-[1.67in] mx-auto" />
//         <p>Scrum Project Management Activities: </p>
//         <ul className="pl-10 list-disc">
//           <li>
//             Sprint Planning Meeting – This is where the scrum team discusses the work that will be done per sprint. The product backlog is being
//             created containing the level of priorities of each task.
//           </li>
//           <li>
//             Daily Scrum or Daily Stand-up – This occurs every day wherein the team gathers to discuss what they have done yesterday, what they are
//             currently working on and what is their next task.
//           </li>
//           <li>Sprint Review – At the end of every sprint, the scrum team discusses what they have and have not accomplished during the sprint.</li>
//           <li>
//             Sprint Demo – This is where the completed product backlog items are demonstrated with the goal of promoting an information discussion
//             between the Scrum Team and Sprint Review participants.{" "}
//           </li>
//           <li>
//             Sprint Retrospective – This is where the team gathers and discusses what they have learned, the challenges they have experienced, and the
//             things that they should work on to improve their next sprint.
//           </li>
//           <li>Backlog Refinement – This is where the team discusses the list of items and tasks that aim to be covered by the next sprint.</li>
//         </ul>
//         <p className="mb-4">
//           {data.project_name ?? ""} will be available for {data.isPlatformDesktop && "Web Browsers "}
//           {data.isPlatformMobile && "Mobile Phones "}
//           {data.isPlatformDesktop && data.isPlatformMobile && "and Mobile Phones"}.
//         </p>
//         <p>{data.specifications ?? ""}</p>
//       </div>
//     </div>
//   </PreviewPage>

//   {/* PAGE 5 */}
//   <div className="page">
//     <h2 className="text-xl font-semibold mb-4">Project Features</h2>

//     {data.applicationPlatformRequirements?.map((platform: StatementOfWorkApplicationPlatformRequest, i) => (
//       <div key={platform.application_platform_index ?? i} className="mb-6">
//         <h3 className="font-semibold">{platform.name}</h3>

//         <ul className="list-decimal ml-6">{platform.features?.map((f) => <li key={f.feature_index}>{f.feature_name}</li>) ?? null}</ul>
//       </div>
//     )) ?? null}
//   </div>

//   {/* PAGE 6 */}
//   <div className="page">
//     <h2 className="text-xl font-semibold mb-4">Requirements</h2>

//     {data.applicationPlatformRequirements?.map((platform: StatementOfWorkApplicationPlatformRequest, pIndex) => (
//       <div key={platform.application_platform_index ?? pIndex} className="mb-6">
//         <h3 className="font-semibold">
//           {pIndex + 1}. {platform.name}
//         </h3>

//         {platform.features?.map((f, fIndex) => (
//           <div key={f.feature_index ?? fIndex} className="ml-4 mt-3">
//             <p>
//               <strong>{f.feature_name}</strong>
//             </p>
//             <p>Description: {f.description}</p>
//             <p>Objective: {f.feature_obj}</p>

//             <p className="mt-2">Acceptance Criteria:</p>
//             <ul className="list-decimal ml-6">{f.acceptance_criteria?.map((a, i) => <li key={a.list_index ?? i}>{a.detail}</li>) ?? null}</ul>
//           </div>
//         )) ?? null}
//       </div>
//     )) ?? null}
//   </div>

//   {/* PAGE 7 */}
//   <div className="page">
//     <h2 className="text-xl font-semibold mb-4">Timelines</h2>

//     <table className="w-full border border-gray-400 text-sm">
//       <thead>
//         <tr>
//           <th className="border p-2">Task</th>
//           <th className="border p-2">Dev SP</th>
//           <th className="border p-2">Test SP</th>
//         </tr>
//       </thead>

//       <tbody>
//         {allFeatures.map((f, i) => (
//           <tr key={f.feature_index ?? i}>
//             <td className="border p-2">{f.feature_name}</td>
//             <td className="border p-2">{f.dev_story_points ?? 0}</td>
//             <td className="border p-2">{f.test_story_points ?? 0}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     <div className="mt-6">
//       <p>
//         Development: {data.development_start_date ? formatDate(data.development_start_date, "long") : ""} -{" "}
//         {data.development_end_date ? formatDate(data.development_end_date, "long") : ""}
//       </p>

//       <p>
//         Testing: {data.testing_start_date ? formatDate(data.testing_start_date, "long") : ""} -{" "}
//         {data.testing_end_date ? formatDate(data.testing_end_date, "long") : ""}
//       </p>

//       <p>UAT: {data.uat_release_date ? formatDate(data.uat_release_date, "long") : ""}</p>

//       <p>Production: {data.prod_release_date ? formatDate(data.prod_release_date, "long") : ""}</p>
//     </div>
//   </div>

//   {/* PAGE 8 */}
//   <div className="page">
//     <h2 className="text-xl font-semibold mb-4">Acceptance</h2>

//     <p>I accept and approve this Statement of Work for {data.project_name ?? ""}.</p>

//     <div className="mt-10 space-y-6">
//       <div>
//         <p>
//           <strong>Prepared by:</strong>
//         </p>
//         <p>{data.prepared_by ?? ""}</p>
//         <p>{data.prepared_by_position ?? ""}</p>
//       </div>

//       <div>
//         <p>
//           <strong>Noted by:</strong>
//         </p>
//         <p>{data.noted_by ?? ""}</p>
//         <p>{data.noted_by_position ?? ""}</p>
//       </div>
//     </div>
//   </div>
// </div>;