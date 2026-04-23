import { type StatementOfWorkRequest, StatementOfWorkSchema } from "@/core/domain/schema/statement-of-work.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StatementOfWorkForm from "../components/StatementOfWorkForm";

export default function StatementOfWorkPage() {
  const form = useForm<StatementOfWorkRequest>({
    resolver: zodResolver(StatementOfWorkSchema),
    defaultValues: {
      project_name: "Sample Project",
      submission_date: undefined,
      start_date: undefined,
      client_name: "Sample Client",

      prepared_by: "Kim Ryan Arminitia",
      noted_by: "Dwight Herrer",

      prepared_by_position: "Business Technology Consultant",
      noted_by_position: "Software Development Manager",

      objectives: [
        { list_index: 1, detail: "objective 1" },
        { list_index: 2, detail: "objective 2" },
      ],
      countries: [
        { list_index: 1, detail: "Japan" },
        { list_index: 2, detail: "Philippines" },
      ],

      isPlatformDesktop: false,
      isPlatformMobile: false,
      applicationPlatformRequirements: [],
    },
    mode: "onChange",
  });

  const { errors } = form.formState;

  console.log(errors);

  return (
    <div className="flex gap-10 p-10">
      <div className="w-[150%] ">
        <StatementOfWorkForm form={form} />
      </div>

      {/* <div className="w-full">
        <h1 className="text-4xl">{formValues.project_name}</h1>
        <span>{JSON.stringify(formValues)}</span>
      </div> */}
    </div>
  );
}
