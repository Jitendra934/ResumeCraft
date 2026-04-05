import { renderToString } from "react-dom/server";
import ModernTemplate from "../components/templates/ModernTemplate";
import ClassicTemplate from "../components/templates/ClassicTemplate";
import MinimalImageTemplate from "../components/templates/MinimalImageTemplate";
import MinimalTemplate from "../components/templates/MinimalTemplate";
import JackRyanTemplate from "../components/templates/JackRyanTemplate";

const renderTemplateToHTML = (data, template, accentColor) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "jackRyan":
        return <JackRyanTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  const htmlContent = renderToString(renderTemplate());

  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          margin: 0;
          padding: 0;
        }
        @page {
          size: A4;
          margin: 0;
        }
        section {
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  return fullHTML;
};

export { renderTemplateToHTML };
