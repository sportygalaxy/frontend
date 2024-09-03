import { FC } from "react";
import ActivatePage from "./ActivatePage";

type Props = {
  params: { token: string };
  searchParams: {};
};

const Page: FC<Props> = (props) => {
  const { params, searchParams } = props;

  return (
    <div>
      <ActivatePage params={params} searchParams={searchParams} />
    </div>
  );
};

export default Page;
