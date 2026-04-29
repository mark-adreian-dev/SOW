interface FormTitleProps {
  title: string;
  sequenceNo: number;
}

export default function FormTitle({ title, sequenceNo }: FormTitleProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="w-15 h-15 border-primary border-2 rounded-full flex items-center justify-center">
        <p className="text-2xl text-primary font-bold -translate-y-0.5">{sequenceNo}</p>
      </div>
      <h2 className="text-5xl font-bold text-primary">{title}</h2>
    </div>
  );
}
