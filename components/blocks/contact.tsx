import * as React from "react";
import Markdown from "react-markdown";
import { Container } from "../container";
import { Section } from "../section";
import { ThemeContext } from "../theme";

export const Contact = ({ data }) => {
  const theme = React.useContext(ThemeContext);
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        size="large"
        className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-0 items-center justify-center"
      >
        <div className="lg:col-start-1 lg:col-end-3 text-center lg:text-left">
          {data.note && (
            <div
              className={`w-full relative mb-10 italic text-2xl font-light tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.note}
              </span>
            </div>
          )}
        </div>
        <div className="lg:col-start-1 lg:col-end-3 text-left lg:text-left">
          {data.street && (
            <div
              className={`w-full relative mb-1 text-3xl font-bold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.street}
              </span>
            </div>
          )}
        </div>
        <div className="lg:col-start-1 lg:col-end-3 text-left lg:text-left">
          {data.city && data.state && data.zip && (
            <h3
              className={`w-full relative mb-10 text-3xl font-bold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.city}, {data.state} {data.zip}
              </span>
            </h3>
          )}
        </div>
        <div className="lg:col-start-1 lg:col-end-3 text-left lg:text-left">
          {data.phone && (
            <h3
              className={`w-full relative mb-1 text-2xl font-normal tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                {data.phone}
              </span>
            </h3>
          )}
        </div>
        <div className="lg:col-start-1 lg:col-end-3 text-left lg:text-left">
          {data.email && (
            <h3
              className={`w-full relative mb-1 text-2xl font-normal tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses[theme.color]
                }`}
              >
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </span>
            </h3>
          )}
        </div>
      </Container>
    </Section>
  );
};
