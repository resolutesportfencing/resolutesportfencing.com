import * as React from "react";
import { Container } from "../container";
import { Section } from "../section";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const CopyrightImage = ({ data }) => {
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
          {data.attribution && <div className="absolute w-full py-2.5 bottom-0 inset-x-0 text-white text-xs text-center leading-4"><TinaMarkdown content={data.attribution} /></div>}
        </div>
      </Container>
    </Section>
  );
};