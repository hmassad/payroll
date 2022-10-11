import { CenteredLayout } from ".";

export function Layout({ children }: { children: JSX.Element }) {

  return (
    <CenteredLayout
    //   navBar={}
      centerVertically={false}
    //   footer={<AppFooter />}
    >
      {children}
    </CenteredLayout>
  );
}
