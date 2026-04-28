import { type StatementOfWorkRequest, StatementOfWorkSchema } from "@/core/domain/schema/statement-of-work.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StatementOfWorkForm from "../components/StatementOfWorkForm";

export default function StatementOfWorkPage() {
  const form = useForm<StatementOfWorkRequest>({
    resolver: zodResolver(StatementOfWorkSchema),
    // defaultValues: {
    //   project_name: "",
    //   submission_date: undefined,
    //   start_date: undefined,
    //   client_name: "",

    //   prepared_by: "",
    //   noted_by: "",

    //   prepared_by_position: "",
    //   noted_by_position: "",

    //   objectives: [],
    //   countries: [],

    //   isPlatformDesktop: false,
    //   isPlatformMobile: false,
    //   applicationPlatformRequirements: [],
    //   specifications: "",

    //   development_start_date: undefined,
    //   development_end_date: undefined,
    //   testing_start_date: undefined,
    //   testing_end_date: undefined,
    //   uat_release_date: undefined,
    //   prod_release_date: undefined,
    // },

    defaultValues: {
      project_name: "Enterprise Procurement Management System",
      client_name: "University of Cabuyao",
      prepared_by: "Kim Ryan Arminitia",
      prepared_by_position: "Business Technology Consultant",
      noted_by: "Dwight Herrer",
      noted_by_position: "Software Development Manager",

      submission_date: new Date("2026-04-15"),
      start_date: new Date("2026-05-01"),

      objectives: [
        {
          list_index: 1,
          detail:
            "To streamline and digitize the entire procurement planning lifecycle by replacing manual and paper-based workflows with a centralized web-based system that allows departments to efficiently create, review, revise, and submit procurement plans such as PPMP and APP while ensuring compliance with institutional and government regulations.",
        },
        {
          list_index: 2,
          detail:
            "To enhance transparency, accountability, and traceability of procurement activities by implementing audit logs, approval tracking mechanisms, and real-time reporting dashboards that provide stakeholders with clear visibility into procurement statuses, historical changes, and decision-making processes across all departments.",
        },
        {
          list_index: 3,
          detail:
            "To improve operational efficiency and reduce delays in procurement approvals by introducing automated workflows, role-based notifications, and escalation mechanisms that ensure timely review and action from responsible personnel while minimizing bottlenecks and redundant communication.",
        },
      ],

      countries: [{ list_index: 1, detail: "Philippines" }],

      isPlatformDesktop: true,
      isPlatformMobile: true,

      specifications:
        "The system will be a fully responsive web-based procurement management platform supported by a companion mobile application, designed to handle procurement planning, approvals, reporting, and document generation. It will include role-based access control, audit trails, exportable reports, and integration-ready APIs for future system expansion.",

      applicationPlatformRequirements: [
        {
          application_platform_index: 1,
          name: "Web Application",
          features: [
            {
              feature_index: 1,
              feature_name: "Procurement Planning Module",
              description:
                "Enables departments to create, manage, and submit procurement plans (PPMP/APP) with structured forms, validations, and version control to ensure accuracy and compliance across all organizational units.",
              feature_obj:
                "To centralize procurement planning and ensure standardized, validated, and traceable submissions aligned with institutional procurement policies and budget cycles.",
              dev_story_points: 8,
              test_story_points: 5,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail:
                    "Users must be able to create, update, and submit procurement plans with complete validation of required fields such as item description, quantity, budget allocation, and timeline, ensuring no incomplete submissions are allowed.",
                },
                {
                  list_index: 2,
                  detail:
                    "Submitted procurement plans must be visible in a centralized dashboard with real-time status tracking, including approval stage, reviewer comments, and revision history for transparency and audit purposes.",
                },
              ],
            },
            {
              feature_index: 2,
              feature_name: "User Management System",
              description:
                "Allows administrators to manage system users, assign roles, and control permissions across modules while ensuring secure access to sensitive procurement data.",
              feature_obj:
                "To enforce role-based access control and ensure that users only access authorized features and data according to their responsibilities within the organization.",
              dev_story_points: 5,
              test_story_points: 3,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail:
                    "Admins must be able to create, edit, and deactivate user accounts while assigning roles that immediately reflect system-wide access permissions without requiring system restart.",
                },
                {
                  list_index: 2,
                  detail:
                    "System must restrict unauthorized access to sensitive modules such as approvals, reports, and financial data based on user role definitions.",
                },
              ],
            },
            {
              feature_index: 3,
              feature_name: "Approval Workflow Engine",
              description:
                "Manages multi-level approval flows for procurement requests, ensuring proper routing based on department hierarchy and budget thresholds.",
              feature_obj:
                "To automate approval routing and eliminate manual forwarding of documents while ensuring accountability at each approval stage.",
              dev_story_points: 8,
              test_story_points: 5,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail:
                    "System must automatically route procurement requests to the correct approver based on predefined workflow rules and budget thresholds.",
                },
                {
                  list_index: 2,
                  detail: "Approvers must be able to approve, reject, or request revisions with all actions logged for audit purposes.",
                },
              ],
            },
            {
              feature_index: 4,
              feature_name: "Audit Trail Logging",
              description:
                "Tracks all system activities including creation, updates, approvals, and deletions to ensure accountability and traceability.",
              feature_obj: "To provide a complete history of user actions for compliance, auditing, and security monitoring purposes.",
              dev_story_points: 6,
              test_story_points: 4,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Every create, update, approve, or delete action must be recorded with timestamp, user ID, and affected record details.",
                },
                {
                  list_index: 2,
                  detail: "Authorized users must be able to view filtered audit logs based on date range, user, or module.",
                },
              ],
            },
            {
              feature_index: 5,
              feature_name: "Dashboard Analytics",
              description:
                "Provides visual summaries of procurement activities including pending approvals, completed requests, and budget utilization.",
              feature_obj: "To give stakeholders real-time insights into procurement performance and decision-making metrics.",
              dev_story_points: 7,
              test_story_points: 5,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail:
                    "Dashboard must display real-time statistics including total procurement requests, pending approvals, and completed transactions.",
                },
                {
                  list_index: 2,
                  detail: "Users must be able to filter analytics by date range, department, and procurement status.",
                },
              ],
            },
            {
              feature_index: 6,
              feature_name: "Document Generation Module",
              description: "Automatically generates procurement-related documents such as PPMP, APP, and approval forms in downloadable formats.",
              feature_obj: "To reduce manual documentation effort and ensure standardized formatting of procurement documents.",
              dev_story_points: 8,
              test_story_points: 5,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail:
                    "System must generate downloadable DOCX and PDF versions of procurement documents with correct formatting and complete data mapping.",
                },
                {
                  list_index: 2,
                  detail: "Generated documents must reflect real-time data from the system without inconsistencies or missing fields.",
                },
              ],
            },
            {
              feature_index: 7,
              feature_name: "Notification System",
              description: "Sends real-time notifications for approvals, updates, and system events via in-app and email channels.",
              feature_obj: "To ensure users are immediately informed of actions requiring their attention and reduce delays in workflows.",
              dev_story_points: 5,
              test_story_points: 3,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Users must receive notifications for pending approvals, status changes, and system updates in real time.",
                },
                {
                  list_index: 2,
                  detail: "Notifications must include relevant context such as request ID, requester, and action required.",
                },
              ],
            },
            {
              feature_index: 8,
              feature_name: "Budget Tracking Module",
              description: "Monitors allocated and spent budgets across procurement activities to ensure financial compliance.",
              feature_obj: "To provide accurate tracking of budget utilization and prevent overspending.",
              dev_story_points: 7,
              test_story_points: 4,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "System must display real-time budget consumption per department and project.",
                },
                {
                  list_index: 2,
                  detail: "Users must receive warnings when budget thresholds are nearing or exceeded.",
                },
              ],
            },
            {
              feature_index: 9,
              feature_name: "Report Generation System",
              description: "Generates customizable procurement reports for auditing, review, and decision-making purposes.",
              feature_obj: "To provide structured reporting tools that support transparency and compliance requirements.",
              dev_story_points: 6,
              test_story_points: 4,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Users must be able to generate reports filtered by date, department, and procurement status.",
                },
                {
                  list_index: 2,
                  detail: "Reports must be exportable in PDF and Excel formats with accurate data representation.",
                },
              ],
            },
            {
              feature_index: 10,
              feature_name: "System Configuration Panel",
              description: "Allows administrators to configure system-wide settings such as workflows, roles, and notification rules.",
              feature_obj: "To provide flexibility in managing system behavior without modifying source code.",
              dev_story_points: 6,
              test_story_points: 4,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Admins must be able to update workflow rules and system settings through a secure interface.",
                },
                {
                  list_index: 2,
                  detail: "Changes in configuration must take effect immediately and be reflected across all modules.",
                },
              ],
            },
          ],
        },

        {
          application_platform_index: 2,
          name: "Mobile Application",
          features: [
            {
              feature_index: 1,
              feature_name: "Approval Notifications",
              description: "Push notifications for procurement approvals, updates, and system alerts in real time.",
              feature_obj: "To enable users to respond quickly to approval requests and system events even while away from desktop systems.",
              dev_story_points: 5,
              test_story_points: 3,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Users must receive real-time notifications for pending approvals with complete context.",
                },
                {
                  list_index: 2,
                  detail: "Users must be able to approve or reject requests directly from the mobile app.",
                },
              ],
            },

            {
              feature_index: 2,
              feature_name: "Mobile Dashboard",
              description: "Provides a simplified overview of procurement status, approvals, and alerts on mobile devices.",
              feature_obj: "To give users quick access to essential procurement data while on the go.",
              dev_story_points: 4,
              test_story_points: 3,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Dashboard must display summary of pending approvals, recent activities, and notifications.",
                },
                {
                  list_index: 2,
                  detail: "Data must sync with web application in real time.",
                },
              ],
            },

            {
              feature_index: 3,
              feature_name: "Mobile Approval Actions",
              description: "Allows users to approve or reject procurement requests directly from mobile devices.",
              feature_obj: "To reduce dependency on desktop access and speed up approval workflows.",
              dev_story_points: 5,
              test_story_points: 3,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Users must be able to approve, reject, or comment on requests via mobile interface.",
                },
                {
                  list_index: 2,
                  detail: "All actions must sync instantly with the web system.",
                },
              ],
            },

            {
              feature_index: 4,
              feature_name: "Offline Mode Support",
              description: "Allows users to view cached procurement data when offline.",
              feature_obj: "To ensure accessibility even without stable internet connection.",
              dev_story_points: 6,
              test_story_points: 4,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Previously loaded data must be accessible without internet connection.",
                },
                {
                  list_index: 2,
                  detail: "System must sync changes automatically once connection is restored.",
                },
              ],
            },

            {
              feature_index: 5,
              feature_name: "Secure Login Authentication",
              description: "Provides secure authentication using token-based login for mobile users.",
              feature_obj: "To ensure only authorized users can access procurement data on mobile devices.",
              dev_story_points: 4,
              test_story_points: 3,
              acceptance_criteria: [
                {
                  list_index: 1,
                  detail: "Users must log in using valid credentials before accessing the mobile app.",
                },
                {
                  list_index: 2,
                  detail: "Sessions must expire after inactivity for security purposes.",
                },
              ],
            },
          ],
        },
      ],

      development_start_date: new Date("2026-05-01"),
      development_end_date: new Date("2026-06-15"),
      testing_start_date: new Date("2026-06-16"),
      testing_end_date: new Date("2026-06-30"),
      uat_release_date: new Date("2026-07-05"),
      prod_release_date: new Date("2026-07-15"),
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return <StatementOfWorkForm form={form} />;
}
