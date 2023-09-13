import { ReactNode } from "react";

import Appshell from "../components/Appshell/Appshell";
import Footer from "../components/Appshell/Footer";

type WithAppshellProps = {
  children: ReactNode;
};

const WithAppshell = (props: WithAppshellProps) => {
  return (
    <Appshell>
      {props.children}
      <Footer />
    </Appshell>
  );
};

export default WithAppshell;
