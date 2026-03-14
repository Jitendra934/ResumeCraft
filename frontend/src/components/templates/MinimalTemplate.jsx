const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white text-gray-900 font-light">
      {/* Header */}
      <header className="mb-2.5">
        <h1 className="text-4xl font-thin mb-2 tracking-wide">
          {data.personalInfo?.fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personalInfo?.email && (
            <a
              href={`mailto:${data.personalInfo.email}`}
              className="break-all hover:underline"
            >
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo?.phoneNumber && (
            <span>{data.personalInfo.phoneNumber}</span>
          )}
          {data.personalInfo?.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo?.linkedInUrl && (
            <a
              href={data.personalInfo.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all hover:underline"
            >
              {data.personalInfo.linkedInUrl}
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.aboutMe && (
        <section className="mb-2.5">
          <h2
            className="text-sm uppercase tracking-widest mb-1.5 font-medium"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className=" text-gray-700 text-sm text-justify whitespace-pre-line">
            {data.aboutMe}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-2.5">
          <h2
            className="text-sm uppercase tracking-widest mb-1.5 font-medium"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-2">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-medium">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-600">{exp.name}</p>
                {exp.jobDescription && (
                  <ul className="list-disc list-inside  text-sm text-gray-700 leading-relaxed">
                    {exp.jobDescription.map((bullet, i) => (
                      <li key={i} className="marker:text-gray-500">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-2.5">
          <h2
            className="text-sm uppercase tracking-widest mb-1.5 font-medium"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-2">
            {data.projects.map((proj, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{proj.projectTitle}</h3>

                  {proj.projectLink && (
                    <a
                      href={proj.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>

                <ul className="list-disc list-inside text-sm text-gray-700 leading-relaxed space-y-1">
                  {proj.description.map((bullet, i) => (
                    <li key={i} className="marker:text-gray-500">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-2.5">
          <h2
            className="text-sm uppercase tracking-widest mb-1.5 font-medium"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.instituteName}</p>
                  {edu.gpa && (
                    <p>
                      {String(edu.gpa).includes("%") ? "Percentage:" : "CGPA:"}{" "}
                      {edu.gpa}
                    </p>
                  )}
                </div>
                <span className="text-right text-sm text-gray-500">
                  {edu.startYear} - {edu.graduationYear}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2
            className="text-sm uppercase tracking-widest mb-1.5 font-medium"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="text-gray-700">{data.skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
