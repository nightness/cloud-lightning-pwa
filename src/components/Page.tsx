import "./index.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Page = ({ children }: Props) => {
  return <div className="page">{children}</div>;
};

export default Page;
