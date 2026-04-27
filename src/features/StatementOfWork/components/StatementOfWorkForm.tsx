import { type StatementOfWorkRequest } from "@/core/domain/schema/statement-of-work.schema";
import Form from "@/core/presentation/components/custom/Form/Form";
import { generateStatementOfWork } from "@/core/lib/generateStatementOfWork";
import { type UseFormReturn } from "react-hook-form";
import SOWAcknowledgementForm from "./SOWAcknowledgementForm";
import { Progress } from "@/core/presentation/components/base/ui/progress";
import SOWProjectInformationForm from "./SOWProjectInformationForm";
import SOWApplicationPlatformForm from "./SOWApplicationPlatformForm";
import SOWTimelinesForm from "./SOWTimelinesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/presentation/components/base/ui/tabs";
import { useState } from "react";

interface StatementOfWorkFormProps {
  form: UseFormReturn<StatementOfWorkRequest>;
}

export default function StatementOfWorkForm({ form }: StatementOfWorkFormProps) {
  const [activeTab, setActiveTab] = useState("project-information");

  const handleSubmit = async (values: StatementOfWorkRequest) => {
    await generateStatementOfWork(values);
    setActiveTab("project-information");
  };

  return (
    <div className="px-12">
      <Progress value={75} className="mb-5 h-2" />

      <Form form={form} onSubmit={handleSubmit} formID="contract-form">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="hidden">
            <TabsTrigger value="project-information">Project Information</TabsTrigger>
            <TabsTrigger value="platform">Application Platform</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="acknowledgement">Acknowledgement</TabsTrigger>
          </TabsList>

          <TabsContent value="project-information">
            <SOWProjectInformationForm form={form} navigateToNextForm={() => setActiveTab("platform")} />
          </TabsContent>

          <TabsContent value="platform">
            <SOWApplicationPlatformForm form={form} navigateToNextForm={() => setActiveTab("timeline")} />
          </TabsContent>

          <TabsContent value="timeline">
            <SOWTimelinesForm form={form} navigateToNextForm={() => setActiveTab("acknowledgement")} />
          </TabsContent>

          <TabsContent value="acknowledgement">
            <SOWAcknowledgementForm form={form} />
          </TabsContent>
        </Tabs>
      </Form>
    </div>
  );
}
