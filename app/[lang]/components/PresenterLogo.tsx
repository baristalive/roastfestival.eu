import dictionaries, {
  Presenter,
  SupportedLanguages,
} from "@/app/dictionaries/all";
import ExportedImage, { ExportedImageProps } from "next-image-export-optimizer";
import { useParams } from "next/navigation";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  RefAttributes,
} from "react";

const PresenterLogo = ({
  name,
  imgProps = {
    className: "h-auto max-h-[16rem] w-full max-w-[16rem]",
    width: 256,
    height: 256,
  },
  aProps = { target: "_blank", rel: "external" },
  divProps = { className: "p-2" },
  showName = false,
}: {
  name: string;
  imgProps?: Omit<
    ExportedImageProps & RefAttributes<HTMLImageElement | null>,
    "src" | "alt"
  >;
  divProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  aProps?: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
  showName?: boolean;
}) => {
  const params = useParams();
  const lang = dictionaries[params.lang as SupportedLanguages];

  const presenter = lang.presenters[
    name as keyof typeof lang.presenters
  ];

  if (!presenter) {
    console.warn(`Presenter "${name}" doesn't exist in list of presenters`)
    return null;
  }

  if (!presenter[presenter.primaryLink]) {
    console.warn(
      `'primaryLink'=${presenter.primaryLink} is not a valid key of ${JSON.stringify(presenter)}`,
    );
    return null;
  }

  const image = (
    <ExportedImage
      {...imgProps}
      src={`/images/promoted/${presenter.logo}`}
      alt={presenter.name}
    />
  );

  return (
    <div {...divProps} key={presenter.name}>
      <a
        {...aProps}
        href={presenter[presenter.primaryLink]}
        title={presenter.name}
      >
        {!showName ? (
          image
        ) : (
          <>
            <div className="flex h-[200px] items-center justify-center">
              {image}
            </div>
            <div className="justify-self-end text-center text-2xl font-bold">
              {presenter.name}
            </div>
          </>
        )}
      </a>
    </div>
  );
};

export default PresenterLogo;
