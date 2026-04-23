import z from "zod";

export const list = z.object({
  list_index: z.number().int(),
  detail: z.string().min(1, "details must be defined"),
});

export const StatementOfWorkFeatures = z.object({
  feature_index: z.number().int(),
  feature_name: z.string().min(1, "Feature name is required"),
  description: z.string().min(1, "Descripton is required"),
  feature_obj: z.string().min(1, "Objectives is required"),
  dev_story_points: z.number().int(),
  test_story_points: z.number().int(),
  acceptance_criteria: z.array(list).min(1, "acceptance criteria must have a single entry"),
});

export const StatementOfWorkApplicationPlatform = z.object({
  application_platform_index: z.number().int(),
  name: z.string().min(1, "Platform name is required"),
  features: z.array(StatementOfWorkFeatures),
});

export const StatementOfWorkSchema = z.object({
  project_name: z.string().min(1, "Project name is required"),
  client_name: z.string().min(1, "Client name is required"),
  prepared_by: z.string().min(1, "Prepare by is required"),
  prepared_by_position: z.string().min(1, "Prepare by position is required"),
  noted_by_position: z.string().min(1, "Noted by position is required"),
  noted_by: z.string().min(1, "Noted by is required"),
  submission_date: z.date().min(1, "Submission date is required"),
  start_date: z.date().min(1, "Start date is required"),
  objectives: z.array(list).min(1, "Must have atleast 1 objectives"),
  countries: z.array(list).min(1, "At least one country is required"),
  isPlatformDesktop: z.boolean(),
  isPlatformMobile: z.boolean(),
  specifications: z.string().min(1, "Specification is required."),
  applicationPlatformRequirements: z.array(StatementOfWorkApplicationPlatform),
});

export type StatementOfWorkRequest = z.infer<typeof StatementOfWorkSchema>;
export type StatementOfWorkApplicationPlatformRequest = z.infer<typeof StatementOfWorkApplicationPlatform>;
export type StatementOfWorkFeaturesRequest = z.infer<typeof StatementOfWorkFeatures>;
export type StatementOfWorkFeaturesAcceptanceCriteriaRequest = z.infer<typeof list>;
