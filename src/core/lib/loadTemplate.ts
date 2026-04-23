export const loadTemplate = async (templatePath: string) => {
  const response = await fetch(templatePath);

  if (!response.ok) {
    throw new Error("Failed to load DOCX template");
  }

  return await response.arrayBuffer();
};
