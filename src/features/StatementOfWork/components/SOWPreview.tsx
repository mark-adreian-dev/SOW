import type { StatementOfWorkApplicationPlatformRequest, StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import DocumentBackground from "@/core/presentation/assets/DocumentBacgkround.png";
import ReactDOM from "react-dom/client";
import React, { type ReactNode, useMemo } from "react";
import { formatDate } from "@/core/helpers/formatDate";
import ScrumDiagram from "@/core/presentation/assets/ScrumDiagram.png";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/presentation/components/base/ui/table";
import { Tab } from "docx";
interface SOWPreviewProps {
  data: StatementOfWorkRequest;
}

export default function SOWPreview({ data }: SOWPreviewProps) {
  const totals = data.applicationPlatformRequirements.reduce(
    (acc, platform) => {
      platform.features?.forEach((f) => {
        acc.dev += f.dev_story_points ?? 0;
        acc.test += f.test_story_points ?? 0;
      });
      return acc;
    },
    { dev: 0, test: 0 }
  );
  const blocks = [
    // PAGE 1
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
        <h2 className="text-[19.9994px] font-semibold ">Statement of Work:</h2>
        <p className="text-[10.9996px]">
          This Statement of Work (SOW) has an effective date of {data.start_date ? formatDate(data.start_date, "long") : ""} and describes the
          services to be performed by OPSOLUTIONS for {data.client_name}.
        </p>
        <div className="mt-6 text-[10.9996px]">
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

    // PAGE 3
    [
      <div className="flex flex-col gap-4">
        <h1 className="w-full text-center text-[19.9994px]">Introduction</h1>

        <h3 className="text-[10.9996px] font-semibold">Project Background</h3>
        <p className="text-[10.9996px]">
          This is the Project Background. Give a brief context. Describe the problem / opportunity. Mention stakeholders involved, initiators /
          requestors. Mention related / past work if any. This document describes the development and services done by OPSOLUTIONS in the completion
          of {data.project_name}.
        </p>
        <h2 className="font-semibold text-[10.9996px]">Project Objectives</h2>

        <ul className="list-decimal ml-6 space-y-4">
          {data.objectives?.map((obj, i) => (
            <li key={i} className="text-[10.9996px]">
              {obj.detail}
            </li>
          )) ?? null}
        </ul>
      </div>,
    ],

    //PAGE 4
    [
      <div className="flex flex-col gap-5">
        <div className="text-[10.9996px]">
          <h2 className="font-semibold">Geographical Scope</h2>
          <p>Scope of Work will only cover project support for the following countries: </p>
          <ul className="list-disc ml-6">{data.countries?.map((c, i) => <li key={i}>{c.detail}</li>) ?? null}</ul>
        </div>
        <div className="text-[10.9996px]">
          <h2 className="font-semibold ">Project Approach</h2>

          <p>
            The team will be using the Scrum Agile approach. Please refer to the figure below. OPSOLUTIONS is using scrum methodology for managing
            software delivery. Scrum is a methodology used by the organization to break down requirements into manageable chunks by collaborating and
            communicating both with the people who are doing the work and the people who need the work done.
          </p>
          <p className="my-5">Scrum Agile Approach diagram:</p>
          <img src={ScrumDiagram} className="w-[3.66in] h-[1.67in] mx-auto" />
          <p>Scrum Project Management Activities: </p>
          <ul className="pl-10 list-disc mb-7">
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
          <p>
            For monitoring tasks, issues, and bugs, OPSOLUTIONS is using Atlassian Jira. It is software used for bug and issue tracking. For this MVP,
            OPSOLUTIONS will be using JIRA to monitor and track all the development deliverables of the project.
          </p>
        </div>
      </div>,
    ],

    //PAGE 5
    [
      <div className="text-[10.9996px]">
        <h2 className="font-semibold mb-4">General Specification</h2>
        <p className="mb-5">
          Enterprise Procurement Management System will be available for{" "}
          {`${data.isPlatformDesktop && data.isPlatformMobile ? " Web Browsers and Mobile phones" : data.isPlatformDesktop ? " Web Browsers" : data.isPlatformMobile ? " Mobile phones" : " "}`}
          . The system will be a fully responsive web-based procurement management platform supported by a companion mobile application, designed to
          handle procurement planning, approvals, reporting, and document generation. It will include role-based access control, audit trails,
          exportable reports, and integration-ready APIs for future system expansion.
        </p>

        <p>Here are some of the supported/targeted specifications:</p>

        <SystemSupportTables isDesktopSupported={data.isPlatformDesktop} isMobileSupported={data.isPlatformMobile} />
        <DevelopmentTeam isDesktop={data.isPlatformDesktop} isMobile={data.isPlatformMobile} />
      </div>,
    ],

    //PAGE 6
    [
      <div className="text-[10.9996px]">
        <h2 className="text-[13.9996px] font-semibold mb-4">Project Features</h2>
        <p>Platforms: </p>

        <ul className="list-disc ml-6">
          {data.applicationPlatformRequirements?.map((platform: StatementOfWorkApplicationPlatformRequest, pIndex) => {
            return <li key={platform.application_platform_index ?? pIndex}>{platform.name}</li>;
          })}

          <div className="flex flex-col gap-10 mt-5">
            {data.applicationPlatformRequirements?.map((platform: StatementOfWorkApplicationPlatformRequest, pIndex) => {
              return (
                <Table className="w-full table-fixed ">
                  <TableHeader className="bg-primary text-foreground border">
                    <TableRow>
                      <TableHead className="text-start py-1 w-45 h-fit">Platform</TableHead>
                      <TableHead className="text-start py-1 h-fit">Features</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="border text-[10.9996px]">
                    <TableRow key={platform.application_platform_index ?? pIndex}>
                      <TableCell className="w-45 h-fit border wrap-break-word whitespace-pre-wrap">{platform.name}</TableCell>
                      <TableCell className="h-fit">
                        <ul className="list-disc ml-6">{platform.features?.map((f) => <li key={f.feature_index}>{f.feature_name}</li>) ?? null}</ul>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })}
          </div>
        </ul>
      </div>,
    ],

    //PAGE 7
    [
      <div className="text-[10.9996px]">
        <h1 className="w-full text-center text-[16.9994px]">Requirements</h1>

        {data.applicationPlatformRequirements?.map((platform: StatementOfWorkApplicationPlatformRequest, pIndex) => {
          return (
            <div key={platform.application_platform_index ?? pIndex}>
              <h1 className="text-[13.9995px] font-bold text-primary">
                {platform.application_platform_index}.{platform.name}
              </h1>
              <Table className="w-full table-fixed border-foreground">
                <TableBody className="border-foreground text-[10.9996px]">
                  {platform.features?.map((f, fIndex) => {
                    return (
                      <React.Fragment key={f.feature_index}>
                        <TableRow className="border-y border-foreground">
                          <TableCell className="border-r border-foreground w-30 align-top wrap-break-word whitespace-pre-wrap">Description</TableCell>
                          <TableCell className="align-top wrap-break-word whitespace-pre-wrap">{f.description}</TableCell>
                        </TableRow>

                        <TableRow className="border-y border-foreground">
                          <TableCell className="border-r border-foreground w-30 align-top wrap-break-word whitespace-pre-wrap">Objectives</TableCell>
                          <TableCell className="align-top wrap-break-word whitespace-pre-wrap">{f.feature_obj}</TableCell>
                        </TableRow>

                        <TableRow className="border-y border-foreground">
                          <TableCell className="border-r border-foreground w-30 align-top wrap-break-word whitespace-pre-wrap">
                            {platform.application_platform_index}.{f.feature_index} Requirements
                          </TableCell>
                          <TableCell className="align-top wrap-break-word whitespace-pre-wrap">{f.feature_name} feature</TableCell>
                        </TableRow>

                        <TableRow className="border-y border-foreground">
                          <TableCell className="border-r border-foreground w-30 align-top wrap-break-word whitespace-pre-wrap">
                            Acceptance Criteria
                          </TableCell>

                          <TableCell className="align-top wrap-break-word whitespace-pre-wrap">
                            <ol className="list-decimal pl-5 space-y-1">
                              {f.acceptance_criteria?.map((ac) => (
                                <li key={ac.list_index} className="wrap-break-word whitespace-pre-wrap">
                                  {ac.detail}
                                </li>
                              ))}
                            </ol>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={2} className="h-3 border-none" />
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>,
    ],

    //PAGE 8
    [
      <div>
        <h2 className="text-[14.9994px] font-semibold mb-4">Version Control:</h2>

        <Table className="w-full table-fixed ">
          <TableHeader className="bg-primary text-foreground border">
            <TableRow>
              <TableHead className="text-center py-1 w-45 h-fit">Version</TableHead>
              <TableHead className="text-center py-1 h-fit">Date</TableHead>
              <TableHead className="text-center py-1 h-fit">Author</TableHead>
              <TableHead className="text-center py-1 h-fit">Change Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border text-[10.9996px]">
            <TableRow>
              <TableCell className="text-center py-1 border">1.0</TableCell>
              <TableCell className="text-center py-1 border">{formatDate(data.submission_date)}</TableCell>
              <TableCell className="text-center py-1 border">{data.prepared_by}</TableCell>
              <TableCell className="text-center py-1 border">Initial Version</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ProjectTeamTable isMobilePlatform={data.isPlatformMobile} isWebPlatform={data.isPlatformDesktop} />
      </div>,
    ],

    //PAGE 9
    [
      <div className="mt-5 flex flex-col gap-5">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-primary text-foreground">
            <TableRow>
              <TableHead className="py-1 text-center w-10 wrap-break-word whitespace-normal">No.</TableHead>

              <TableHead className="py-1 text-center w-55 wrap-break-word whitespace-normal">Improvement / Task</TableHead>

              <TableHead className="py-1 text-center w-22.5 wrap-break-word whitespace-normal">Development Story Points</TableHead>

              <TableHead className="py-1 text-center w-22.5 wrap-break-word whitespace-normal">Testing Story Points</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border">
            {data.applicationPlatformRequirements.map((item, platformIndex) =>
              item.features.map((feature, featureIndex) => {
                return (
                  <TableRow key={`${platformIndex}-${featureIndex}`}>
                    <TableCell className="py-1 border-r wrap-break-word whitespace-pre-wrap text-center">
                      {platformIndex + 1}.{featureIndex + 1}
                    </TableCell>

                    <TableCell className="py-1 border-r wrap-break-word whitespace-pre-wrap">{feature.feature_name}</TableCell>

                    <TableCell className="py-1 border-r text-center wrap-break-word">{feature.dev_story_points ?? "-"}</TableCell>

                    <TableCell className="py-1 border-r text-center wrap-break-word">{feature.test_story_points ?? "-"}</TableCell>
                  </TableRow>
                );
              })
            )}
            <TableRow>
              <TableCell className="bg-gray-300 py-1 wrap-break-word whitespace-pre-wrap text-center"></TableCell>
              <TableCell className="bg-gray-300 py-1 font-bold border-r wrap-break-word whitespace-pre-wrap text-end">TOTAL STORY POINTS</TableCell>
              <TableCell className="py-1 border-r text-center wrap-break-word">{totals.dev}</TableCell>
              <TableCell className="py-1 border-r text-center wrap-break-word">{totals.test}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="w-full table-fixed">
          <TableHeader className="bg-primary text-foreground">
            <TableRow>
              <TableHead className="py-1 text-center w-[40%] wrap-break-word whitespace-normal">Sprint Events</TableHead>
              <TableHead className="py-1 text-center w-full wrap-break-word whitespace-normal">Dates</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border">
            <TableRow>
              <TableCell className="border py-1 wrap-break-word whitespace-pre-wrap text-center">Development Dates</TableCell>
              <TableCell className="py-1 wrap-break-word whitespace-pre-wrap text-center">
                {formatDate(data.development_start_date, "long") ?? ""} - {formatDate(data.development_end_date, "long") ?? ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border py-1 wrap-break-word whitespace-pre-wrap text-center">Testing Dates</TableCell>
              <TableCell className="py-1 wrap-break-word whitespace-pre-wrap text-center">
                {formatDate(data.testing_start_date, "long") ?? ""} - {formatDate(data.testing_end_date, "long") ?? ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border py-1 wrap-break-word whitespace-pre-wrap text-center">Beta/ UAT Release</TableCell>
              <TableCell className="py-1 wrap-break-word whitespace-pre-wrap text-center">
                {formatDate(data.uat_release_date, "long") ?? ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border py-1 wrap-break-word whitespace-pre-wrap text-center">Production Release</TableCell>
              <TableCell className="py-1 wrap-break-word whitespace-pre-wrap text-center">
                {formatDate(data.prod_release_date, "long") ?? ""}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>,
    ],
    //PAGE 10
    [
      <div className="text-[10.9996px]">
        <h2 className="text-[19.9994px] font-semibold mb-5">Acceptance</h2>
        <p className="mb-4">
          I accept and approve this Statement of Work for the development of {data.project_name}. Note: This Statement of Work covers only the
          specified requirements above. Should there be additional requirements required by {data.client_name} which is not part of the Approved
          Statement of Work, OPSOLUTIONS shall conduct an assessment and evaluation of the effort involved in developing these newly specified
          requirements and evaluate the impact to the project timeline.
        </p>
        <h2 className="font-semibold mb-4 text-[13.9996px]">Accepted by:</h2>
        <Table className="w-full table-fixed">
          <TableHeader className="bg-gray-300 text-foreground">
            <TableRow>
              <TableHead className="text-xs h-fit py-1 border border-foreground text-center w-full wrap-break-word whitespace-normal">Name</TableHead>
              <TableHead className="text-xs h-fit py-1 border border-foreground text-center w-full wrap-break-word whitespace-normal">
                Designation
              </TableHead>
              <TableHead className="text-xs h-fit py-1 border border-foreground text-center w-full wrap-break-word whitespace-normal">
                Signature
              </TableHead>
              <TableHead className="text-xs h-fit py-1 border border-foreground text-center w-full wrap-break-word whitespace-normal">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border">
            <TableRow>
              <TableCell className="h-5 py-1 wrap-break-word border-foreground border whitespace-pre-wrap text-center"></TableCell>
              <TableCell className="h-5 py-1 wrap-break-word border-foreground border whitespace-pre-wrap text-center"></TableCell>
              <TableCell className="h-5 py-1 wrap-break-word border-foreground border whitespace-pre-wrap text-center"></TableCell>
              <TableCell className="h-5 py-1 wrap-break-word border-foreground border whitespace-pre-wrap text-center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex flex-col items-center justify-center gap-10 mt-15">
          <h2 className="font-semibold mb-4 text-[13.9996px]">Accepted by:</h2>
          <div className="text-center">
            <p className="text-[14px]">{data.prepared_by}</p>
            <p className="text-[14px]">OPSOLUTIONS - {data.prepared_by_position}</p>
          </div>

          <h2 className="font-semibold mb-4 text-[13.9996px]">Noted by:</h2>
          <div className="text-center">
            <p className="text-[14px]">{data.noted_by}</p>
            <p className="text-[14px]">OPSOLUTIONS - {data.noted_by_position}</p>
          </div>
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

interface SystemSupportTablesProps {
  isDesktopSupported: boolean;
  isMobileSupported: boolean;
}

function SystemSupportTables({ isDesktopSupported, isMobileSupported }: SystemSupportTablesProps) {
  return (
    <div className="space-y-8 mt-7">
      {/* Desktop Support */}
      {isDesktopSupported && (
        <div className="text-[10.9996px]">
          <p className="mb-2 font-semibold">Desktop</p>
          <Table>
            <TableHeader className="bg-primary text-foreground border">
              <TableRow className="border">
                <TableHead className="text-center py-1 h-fit">Operating System</TableHead>
                <TableHead className="text-center py-1 h-fit">Browser</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border">
              <TableRow>
                <TableCell className="py-0 border">Windows 10+</TableCell>
                <TableCell className="py-0">Google Chrome</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-0 border">macOS</TableCell>
                <TableCell className="py-0">Mozilla Firefox</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-0 border"></TableCell>
                <TableCell className="py-0">Safari</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      {/* Mobile Support */}
      {isMobileSupported && (
        <div className="text-[10.9996px]">
          <p className="mb-2 font-semibold">Mobile</p>

          <Table>
            <TableHeader className="bg-primary text-foreground border">
              <TableRow className="border">
                <TableHead className="text-center py-1 h-fit">Operating System</TableHead>
                <TableHead className="text-center py-1 h-fit">Layout Supported</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border">
              <TableRow>
                <TableCell className="py-0 border">Android</TableCell>
                <TableCell className="py-0 border">Mobile</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-0 border">iOS</TableCell>
                <TableCell className="py-0 border">Tablet</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

interface DevelopmentTeamProps {
  isDesktop: boolean;
  isMobile: boolean;
}

const teamRoles = [
  "Software Delivery Manager",
  "Business Technology Consultant",
  "Technical Lead",
  "Mobile App Developer",
  "Web App Developer",
  "API Developer",
  "UI/UX Designer",
];

function DevelopmentTeam({ isDesktop, isMobile }: DevelopmentTeamProps) {
  if (!isDesktop && !isMobile) {
    return <p className="text-sm text-muted-foreground">No development team available.</p>;
  }

  return (
    <div className="space-y-2 text-[13.9996px] mt-8">
      <h2 className="font-semibold">Development Team</h2>

      <ul className="list-disc pl-6 space-y-1 text-sm">
        {teamRoles.map((role, index) => {
          if (role === "Mobile App Developer" && !isMobile) return null;
          if (role === "Web App Developer" && !isDesktop) return null;

          return <li key={index}>{role}</li>;
        })}
      </ul>
    </div>
  );
}

interface ProjectTeamTableProps {
  isWebPlatform: boolean;
  isMobilePlatform: boolean;
}

const baseTeam = [
  { role: "Project Manager", web: true, mobile: true },
  { role: "API Developers", web: true, mobile: true },
  { role: "Web Developers", web: true, mobile: false },
  { role: "Mobile Developers", web: false, mobile: true },
  { role: "Technical Lead", web: true, mobile: true },
  { role: "Quality Assurance", web: true, mobile: true },
  { role: "Business Analyst", web: true, mobile: true },
  { role: "UI / UX", web: true, mobile: true },
];

function ProjectTeamTable({ isWebPlatform, isMobilePlatform }: ProjectTeamTableProps) {
  const filteredTeam = baseTeam.filter((item) => {
    if (isWebPlatform && item.web) return true;
    if (isMobilePlatform && item.mobile) return true;
    return false;
  });

  return (
    <div className="text-[10.9996px] mt-5">
      <h2 className="text-[14.9994px] font-semibold mb-4">Project Team Components</h2>
      {(isWebPlatform || isMobilePlatform) && (
        <Table className="w-full table-fixed">
          <TableHeader className="bg-primary text-foreground">
            <TableRow>
              <TableHead className="py-1 wrap-break-word whitespace-normal text-center">Role</TableHead>
              <TableHead className="py-1 wrap-break-word whitespace-normal text-center">Number of Resources</TableHead>
              <TableHead className="py-1 wrap-break-word whitespace-normal text-center">Working Days Required</TableHead>
              <TableHead className="py-1 wrap-break-word whitespace-normal text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border">
            {filteredTeam.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-0 text-center border-r wrap-break-word whitespace-pre-wrap">{item.role}</TableCell>
                <TableCell className="py-0 text-center border-r">1</TableCell>
                <TableCell className="py-0 text-center border-r"></TableCell>
                <TableCell className="py-0 text-center border-r"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
