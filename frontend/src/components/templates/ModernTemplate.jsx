import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header
        className="p-6 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-light mb-2">
          {data.personalInfo?.fullName || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="break-all hover:underline"
              >
                {data.personalInfo.email}
              </a>
            </div>
          )}
          {data.personalInfo?.phoneNumber && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personalInfo.phoneNumber}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo?.linkedInUrl && (
            <a
              target="_blank"
              href={data.personalInfo?.linkedInUrl}
              className="flex items-center gap-2"
            >
              <Linkedin className="size-4" />
              <span className="break-all text-xs hover:underline">
                {data.personalInfo.linkedInUrl.split("https://www.")[1]
                  ? data.personalInfo.linkedInUrl.split("https://www.")[1]
                  : data.personalInfo.linkedInUrl}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="px-6 py-2">
        {/* Professional Summary */}
        {data.aboutMe && (
          <section className="mb-2">
            <h2 className="text-2xl font-light mb-2 pb-1 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm">{data.aboutMe}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-2">
            <h2 className="text-2xl font-light mb-1 pb-1 border-b border-gray-200">
              Experience
            </h2>

            <div className="space-y-1.5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.jobTitle}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.jobDescription && (
                    <div className="text-gray-700 ml-2 leading-relaxed text-sm whitespace-pre-line">
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
          <section className="mb-2">
            <h2 className="text-2xl font-light mb-1 pb-1 border-b border-gray-200">
              Projects
            </h2>

            <div className="space-y-1.5">
              {data.projects.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {p.projectTitle}
                      </h3>
                      <p>
                        {p.projectLink && (
                          <a
                            href={p.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-sm"
                          >
                            Live Demo / Link
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                  {p.description && (
                    <div className="text-gray-700 ml-2 leading-relaxed text-sm whitespace-pre-line">
                      {p.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-1 pb-1 border-b border-gray-200">
                Education
              </h2>

              <div className="space-y-1.5">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.instituteName}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{(edu.startYear)} -{" "}{(edu.graduationYear)}</span>
                      {edu.gpa && <span>GPA / Percentage: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-1 pb-1 border-b border-gray-200">
                Skills
              </h2>

              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
