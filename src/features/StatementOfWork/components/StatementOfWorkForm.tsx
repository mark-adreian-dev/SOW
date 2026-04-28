import { type StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import Form from "@/core/presentation/components/custom/Form/Form";
import { generateStatementOfWork } from "@/core/lib/generateStatementOfWork";
import { useWatch, type UseFormReturn } from "react-hook-form";
import SOWAcknowledgementForm from "./SOWAcknowledgementForm";
import { Progress } from "@/core/presentation/components/base/ui/progress";
import SOWProjectInformationForm from "./SOWProjectInformationForm";
import SOWApplicationPlatformForm from "./SOWApplicationPlatformForm";
import SOWTimelinesForm from "./SOWTimelinesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/presentation/components/base/ui/tabs";
import { useState } from "react";
import { useStepValidation } from "@/core/presentation/hooks/useStepValidation";
import SOWDownloadForm from "./SOWDonwloadForm";
import SOWOnboard from "./SOWOnboard";

//Preview
import DocumenBackground from "@/core/presentation/assets/DocumentBacgkround.png";
import { ScrollArea } from "@/core/presentation/components/base/ui/scroll-area";
import { formatDate } from "@/core/helpers/formatDate";

interface StatementOfWorkFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
}
const stepFields = ["applicationPlatformRequirements"] as const;
export default function StatementOfWorkForm({ form }: StatementOfWorkFormProps) {
  const [activeTab, setActiveTab] = useState("on-board");
  const [progressValue, setProgressValue] = useState(20);
  const { validateAndScroll } = useStepValidation(form, stepFields);
  const handleSubmit = async (values: StatementOfWorkRequest) => {
    validateAndScroll(async () => {
      await generateStatementOfWork(values);
      setProgressValue(20);
      form.reset();
      form.clearErrors();
      setActiveTab("on-board");
    });
  };

  const watchedValues = useWatch({
    control: form.control,
  });

  return (
    <div className="flex h-full">
      <div className="w-full h-full px-12 min-h-screen ">
        {activeTab !== "on-board" && <Progress value={progressValue} className="mb-5 h-2" />}

        <Form<StatementOfWorkRequest> form={form} onSubmit={handleSubmit} formID="contract-form">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="hidden">
              <TabsTrigger value="on-board">On Board</TabsTrigger>
              <TabsTrigger value="project-information">Project Information</TabsTrigger>
              <TabsTrigger value="platform">Application Platform</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="acknowledgement">Acknowledgement</TabsTrigger>
              <TabsTrigger value="download">Download</TabsTrigger>
            </TabsList>

            <TabsContent value="on-board" className="h-full">
              <SOWOnboard
                navigateToNextForm={() => {
                  setActiveTab("project-information");
                  setProgressValue(20);
                }}
              />
            </TabsContent>

            <TabsContent value="project-information">
              <SOWProjectInformationForm
                form={form}
                navigateToNextForm={() => {
                  setActiveTab("platform");
                  setProgressValue(40);
                }}
              />
            </TabsContent>

            <TabsContent value="platform">
              <SOWApplicationPlatformForm
                form={form}
                navigateToNextForm={() => {
                  setActiveTab("timeline");
                  setProgressValue(60);
                }}
                navigateToPrevForm={() => {
                  setActiveTab("project-information");
                  setProgressValue(20);
                }}
              />
            </TabsContent>

            <TabsContent value="timeline">
              <SOWTimelinesForm
                form={form}
                navigateToNextForm={() => {
                  setActiveTab("acknowledgement");
                  setProgressValue(80);
                }}
                navigateToPrevForm={() => {
                  setActiveTab("platform");
                  setProgressValue(60);
                }}
              />
            </TabsContent>

            <TabsContent value="acknowledgement">
              <SOWAcknowledgementForm
                form={form}
                navigateToNextForm={() => {
                  setActiveTab("download");
                  setProgressValue(100);
                }}
                navigateToPrevForm={() => {
                  setActiveTab("platform");
                  setProgressValue(60);
                }}
              />
            </TabsContent>

            <TabsContent value="download">
              <SOWDownloadForm
                navigateToPrevForm={() => {
                  setActiveTab("acknowledgement");
                  setProgressValue(80);
                }}
              />
            </TabsContent>
          </Tabs>
        </Form>
      </div>

      {activeTab !== "on-board" && (
        <ScrollArea className="h-[90vh] w-250 shadow-2xl bg-slate-100 ">
          {/* CENTERING WRAPPER 
      This div provides the background and ensures the paper stays centered.
      We use flex and justify-center.
  */}
          <div
            className="w-full h-full p-10"
            style={{
              backgroundImage: `url(${DocumenBackground})`,
              backgroundSize: "100% auto",
              backgroundRepeat: "repeat-y",
            }}
          >
            <h1 className="text-blue-800 text-[150px] mt-30 font-semibold">SOW</h1>
            <h2 className="text-muted-foreground text-2xl mb-21">{watchedValues.project_name}</h2>
            <h2 className="text-muted-foreground text-2xl">
              Date: {watchedValues.submission_date ? formatDate(watchedValues.submission_date, "long") : "N/A"}
            </h2>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
