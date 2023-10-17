import "font-awesome/scss/font-awesome.scss";
import "./styles.scss";

import GoogleAnalytics from "./GoogleAnalytics";

export const metadata = {
  title: "Andy Bright - Portfolio",
  description: "Product and UX Design Lead",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {process.env.GA_TRACKING_ID ? (
        <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID} />
      ) : null}
      <body>{children}</body>
    </html>
  );
}
