import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 leading-relaxed">
      <div style={{ fontSize: "1px", opacity: 0 }}>
        RESUME_CRAFT_ID:{data._id}
      </div>
      {/* Header */}
      <header
        className="text-center mb-2 pb-2 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personalInfo?.fullName || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
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
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personalInfo.phoneNumber}</span>
            </div>
          )}
          {data.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo?.linkedInUrl && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              {data.personalInfo.linkedInUrl && (
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
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.aboutMe && (
        <section className="mb-2">
          <h2
            className="text-xl font-semibold mb-1.5"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p
            className="text-gray-700 text-sm leading-relaxed"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            {data.aboutMe}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-2">
          <h2
            className="text-xl font-semibold mb-1.5"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-1.5">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-3 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.name}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.jobDescription && (
                  <ul className="list-disc ml-3 text-gray-700 text-sm leading-relaxed">
                    {exp.jobDescription.map((point, i) => (
                      <li
                        key={i}
                        className="marker:text-gray-800"
                        style={{
                          textAlign: "justify",
                          textJustify: "inter-word",
                        }}
                      >
                        {point}
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
        <section className="mb-2">
          <h2
            className="text-xl font-semibold mb-1.5"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <ul className="space-y-1.5 ">
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-l-3 border-gray-300 pl-4"
              >
                <div>
                  <li className="font-semibold text-gray-800 ">
                    {proj.projectTitle}
                  </li>
                  <p>
                    {proj.projectLink && (
                      <a
                        href={proj.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:underline text-sm"
                      >
                        Live Demo / Link
                      </a>
                    )}
                  </p>
                  {proj.description && (
                    <ul className="list-disc ml-3 text-gray-700 text-sm leading-relaxed">
                      {proj.description.map((point, i) => (
                        <li key={i} className="marker:text-gray-800">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-2">
          <h2
            className="text-xl font-semibold mb-1.5"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-1.5">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.instituteName}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>
                    {edu.startYear} - {edu.graduationYear}
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

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-2">
          <h2
            className="text-xl font-semibold mb-1.5"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex gap-2 flex-wrap">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
