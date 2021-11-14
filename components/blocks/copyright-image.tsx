import * as React from "react";
import Markdown from "react-markdown";
import { Actions } from "../actions";
import { Container } from "../container";
import { Section } from "../section";
import { ThemeContext } from "../theme";

export const CopyrightImage = ({ data }) => {
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
        size="small"
        className="grid grid-cols-1 lg:grid-cols-1 gap-x-10 gap-y-0 items-center justify-center py-0"
      >
        <div className="lg:col-start-1 lg:col-end-1 text-center lg:text-center">
          {data.image && (
            <div className="row-start-1 flex justify-center">
              <img
                className="object-cover w-full h-full"
                alt={data.image.alt}
                src={data.image.src}
              />
            </div>
          )}
          {data.attribution && <div className="absolute w-full py-2.5 bottom-0 inset-x-0 text-white text-xs text-center leading-4"><Markdown>{data.attribution}</Markdown></div>}
        </div>
      </Container>
    </Section>
  );
};