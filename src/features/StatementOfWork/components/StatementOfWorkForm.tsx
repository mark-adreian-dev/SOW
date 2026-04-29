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
import { ScrollArea } from "@/core/presentation/components/base/ui/scroll-area";
import SOWPreview from "./SOWPreview";

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
    <ScrollArea className="flex h-[calc(100vh-65px)]">
      <div className="flex gap-5 pr-2">
        <ScrollArea className="h-[calc(100vh-65px)] w-full shadow-2xl pr-4">
          <div className={`w-full ${activeTab !== "on-board" ? "p-12" : "p-0"} pr-0`}>
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
        </ScrollArea>

        {activeTab !== "on-board" && (
          <ScrollArea className="h-[calc(100vh-65px)] w-[70%] shadow-2xl bg-slate-100 ">
            <SOWPreview data={watchedValues as StatementOfWorkRequest} />
          </ScrollArea>
        )}
      </div>
    </ScrollArea>
  );
}
