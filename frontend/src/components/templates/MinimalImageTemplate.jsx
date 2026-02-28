import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid grid-cols-3">
        <div className="col-span-1  py-10">
          {/* Image */}
          {data.personalInfo?.image &&
          typeof data.personalInfo.image === "string" ? (
            <div className="mb-6">
              <img
                src={data.personalInfo.image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
                style={{ background: accentColor + "70" }}
              />
            </div>
          ) : data.personalInfo?.image &&
            typeof data.personalInfo.image === "object" ? (
            <div className="mb-6">
              <img
                src={URL.createObjectURL(data.personalInfo.image)}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          ) : null}
        </div>

        {/* Name */}
        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
            {data.personalInfo?.fullName || "Your Name"}
          </h1>
        </div>

        {/* Left Sidebar */}
        <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">
          {/* Contact */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personalInfo.phoneNumber}</span>
                </div>
              )}
              {data.personalInfo?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  <a
                    href={`mailto:${data.personalInfo.email}`}
                    className="break-all hover:underline"
                  >
                    {data.personalInfo.email}
                  </a>
                </div>
              )}
              {data.personalInfo?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo?.linkedInUrl && (
                <div className="flex items-center gap-2">
                  <Linkedin className="size-4" style={{ color: accentColor }}/>
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
          </section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-3 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    <p className="text-zinc-600">{edu.instituteName}</p>
                    <p className="text-xs text-zinc-500">
                      {edu.startYear} - {edu.graduationYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-2">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-span-2 p-8 pt-0">
          {/* Summary */}
          {data.aboutMe && (
            <section className="mb-4">
              <h2
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="text-zinc-700 leading-relaxed">{data.aboutMe}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold tracking-widest mb-2"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-2 mb-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-zinc-900">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: accentColor }}>
                      {exp.name}
                    </p>
                    {exp.jobDescription && (
                      <ul className="ml-2 text-sm text-zinc-700 leading-relaxed space-y-1 whitespace-pre-line">
                        {exp.jobDescription}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2
                className="text-sm uppercase tracking-widest font-semibold"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-2">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-md font-medium text-zinc-800 mt-3">
                      {project.projectTitle}
                    </h3>
                    <p className="text-sm mb-1" >
                      {project.projectLink && (
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" hover:underline"
                        >
                          Live Demo / Link
                        </a>
                      )}
                    </p>
                    {project.description && (
                      <ul className="ml-2 text-sm text-zinc-700  space-y-1 whitespace-pre-line">
                        {project.description}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
