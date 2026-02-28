import React from "react";

const JackRyanTemplate = ({ data, accentColor }) => {
  // Date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };


  return (
    <div className="max-w-4xl mx-auto p-5 bg-white text-gray-900 font-sans">
      {/* Header */}
      <header
        className="text-center pb-3 mb-3"
        style={{ borderColor: accentColor || "#1f2937" }}
      >
        <h1
          className="text-4xl font-bold uppercase tracking-widest mb-2"
          style={{ color: accentColor || "#111827" }}
        >
          {data.personalInfo?.fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-700">
          {data.personalInfo?.phoneNumber && (
            <span>{data.personalInfo.phoneNumber}</span>
          )}
          {data.personalInfo?.phoneNumber && data.personalInfo?.email && (
            <span className="text-gray-400">|</span>
          )}
          {data.personalInfo?.email && (
            <a
              href={`mailto:${data.personalInfo.email}`}
              className="hover:underline"
            >
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo?.email && data.personalInfo?.linkedInUrl && (
            <span className="text-gray-400">|</span>
          )}
          {data.personalInfo?.linkedInUrl && (
            <a
              href={data.personalInfo.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {data.personalInfo.linkedInUrl.replace(/(^\w+:|^)\/\//, "")}
            </a>
          )}
          {/* {data.personalInfo?.githubUrl && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={data.personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {data.personalInfo.githubUrl.replace(/(^\w+:|^)\/\//, "")}
              </a>
            </>
          )} */}
        </div>
      </header>

      {/* About Me / Professional Summary */}
      {data.aboutMe && (
        <section className="mb-3">
          <h2
            className="text-lg font-bold border-b-2 mb-2 uppercase tracking-wider"
            style={{ borderColor: "#d1d5db", color: accentColor || "#111827" }}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-justify whitespace-pre-line">
            {data.aboutMe}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-lg font-bold border-b-2 mb-2 uppercase tracking-wider"
            style={{ borderColor: "#d1d5db", color: accentColor || "#111827" }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold text-[15px]">
                  <h3>{edu.instituteName}</h3>
                  <span>
                    {edu.startYear} - {edu.graduationYear}
                  </span>
                </div>
                <div className="flex justify-between text-sm italic text-gray-800 mt-1">
                  <p>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  {edu.gpa && (
                    <p>
                      {String(edu.gpa).includes("%") ? "Percentage:" : "CGPA:"}{" "}
                      {edu.gpa}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-lg font-bold border-b-2 mb-2 uppercase tracking-wider"
            style={{ borderColor: "#d1d5db", color: accentColor || "#111827" }}
          >
            Experience
          </h2>
          <div className="space-y-2">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[15px]">{exp.jobTitle}</h3>
                  <span className="text-sm font-semibold text-gray-700">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm italic text-gray-800 mb-1">{exp.name}</p>
                {/* Replaced whitespace-pre-line div with the custom renderer */}
                {exp.jobDescription && (
                  <div className="text-gray-700 text-sm ml-2 leading-relaxed whitespace-pre-line">
                    {exp.jobDescription}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-lg font-bold border-b-2 mb-2 uppercase tracking-wider"
            style={{ borderColor: "#d1d5db", color: accentColor || "#111827" }}
          >
            Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  {proj.projectLink && (
                    <a
                      href={proj.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:underline"
                      style={{ color: accentColor || "#2563eb" }}
                    >
                      Live Demo / Link
                    </a>
                  )}
                  <h3 className="font-bold text-[15px]">{proj.projectTitle}</h3>
                </div>
                {proj.description && (
                  <div className="text-gray-700 text-sm ml-2 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-lg font-bold border-b-2 mb-2 uppercase tracking-wider"
            style={{ borderColor: "#d1d5db", color: accentColor || "#111827" }}
          >
            Skills
          </h2>
          <div className="text-sm space-y-2 text-gray-800">
            {data.skills.map((skill, index) => {
              if (skill.includes(":")) {
                const [category, ...rest] = skill.split(":");
                return (
                  <div key={index}>
                    <span className="font-bold">{category}:</span>{" "}
                    {rest.join(":")}
                  </div>
                );
              }
              return (
                <span key={index} className="inline-block mr-2 mb-1">
                  {index < data.skills.length ? " • " : ""}
                  {skill}
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default JackRyanTemplate;
