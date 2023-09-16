import Appshell, {
  AppShellExtendedProps,
} from "../components/Appshell/Appshell";
import Footer from "../components/Appshell/Footer";

const WithAppshell = ({ children, ...props }: AppShellExtendedProps) => {
  return (
    <Appshell {...props}>
      {children}
      <Footer />
    </Appshell>
  );
};

export default WithAppshell;
