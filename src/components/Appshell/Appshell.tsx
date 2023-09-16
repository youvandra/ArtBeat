import { AppShell as A, AppShellProps as AProps } from "@mantine/core";
import Header from "./Header";

export type AppShellExtendedProps = {
  headerTransparent?: boolean;
} & AProps;

export default function Appshell({
  headerTransparent,
  children,
  ...props
}: AppShellExtendedProps) {
  return (
    <A
      padding={0}
      header={<Header transparent={headerTransparent} />}
      {...props}
    >
      {children}
    </A>
  );
}
