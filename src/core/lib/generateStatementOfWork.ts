import { type StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { loadTemplate } from "./loadTemplate";
import { formatDate } from "../helpers/formatDate";

export const generateStatementOfWork = async (values: StatementOfWorkRequest) => {
  try {
    const arrayBuffer = await loadTemplate("/templates/statement-of-work-template.docx");

    const zip = new PizZip(arrayBuffer);

    const allFeatures = values.applicationPlatformRequirements.flatMap((platform) => platform.features);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: {
        start: "[[",
        end: "]]",
      },
    });

    doc.render({
      project_name: values.project_name,
      submission_date: formatDate(values.submission_date, "long"),
      start_date: formatDate(values.start_date, "long"),
      client_name: values.client_name,
      objectives: [...values.objectives],
      countries: values.countries,
      noted_by: values.noted_by,
      noted_by_position: values.noted_by_position,
      specification: values.specifications,
      prepared_by: values.prepared_by,
      prepared_by_position: values.prepared_by_position,
      isPlatformMobile: values.isPlatformDesktop && values.isPlatformMobile ? false : values.isPlatformMobile,
      isPlatformDesktop: values.isPlatformDesktop && values.isPlatformMobile ? false : values.isPlatformDesktop,
      isBothPlatform: values.isPlatformDesktop && values.isPlatformMobile,
      applicationPlatformRequirements: values.applicationPlatformRequirements,
      total_dev_story_points: allFeatures.reduce((sum, feature) => sum + (feature.dev_story_points || 0), 0),
      total_test_story_points: allFeatures.reduce((sum, feature) => sum + (feature.test_story_points || 0), 0),

      development_start_date: formatDate(values.development_start_date, "long"),
      development_end_date: formatDate(values.development_end_date, "long"),
      testing_start_date: formatDate(values.testing_start_date, "long"),
      testing_end_date: formatDate(values.testing_end_date, "long"),
      uat_release_date: formatDate(values.uat_release_date, "long"),
      prod_release_date: formatDate(values.prod_release_date, "long"),
    });

    const blob = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    return saveAs(blob, `${values.project_name || "contract"}.docx`);
  } catch (error) {
    console.error("Error generating DOCX:", error);
  }
};
