import { Document, Packer, Paragraph, ImageRun, Header } from "docx";
import DocumentBackground from "@/core/presentation/assets/DocumentBacgkround.png";

export const generateDocxSOW = async () => {
  const bgImage = await fetch(DocumentBackground).then((res) => res.arrayBuffer());

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240, // ✅ Letter width
              height: 15840, // ✅ Letter height
            },
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: bgImage,
                    type: "png",
                    transformation: {
                      width: 816,
                      height: 1056,
                    },
                    floating: {
                      horizontalPosition: {
                        offset: 0,
                      },
                      verticalPosition: {
                        offset: 0,
                      },
                      behindDocument: true, // 🔥 key line
                    },
                  }),
                ],
              }),
            ],
          }),
        },

        children: [new Paragraph("STATEMENT OF WORK"), new Paragraph("This text appears on top of the background image.")],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "background.docx";
  a.click();
};
