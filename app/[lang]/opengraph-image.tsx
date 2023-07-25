import { ImageResponse } from "next/server";
import dictionaries, { SupportedLanguages } from "../dictionaries/all";
import Logo from "../icons/logo";

export async function generateImageMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const lang = dictionaries[params.lang as SupportedLanguages];

  return [{
    id: params.lang,
    size: { width: 1200, height: 600 },
    alt: lang.title,
    contentType: "image/png",
  }];
}

export default async function Image({
  params,
}: {
  params: { lang: string };
}) {
  const lang = dictionaries[params.lang as SupportedLanguages];

  return new ImageResponse(
    (
      <div style={{
        backgroundColor: "#fff800",
          width: '100%',
          height: '100%',
          display: 'flex',
      }}>
        <Logo />
      </div>
    )
  );
}
