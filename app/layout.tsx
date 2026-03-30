import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
    >
      <head>
        <title>BaseCounter</title>
        {/* BASE_APP_ID_PLACEHOLDER */}
        <meta name="base:app_id" content="69c9e47e54fba99e37410fdf" />
        {/* TALENT_VERIFICATION_PLACEHOLDER */}
        <meta
          name="talentapp:project_verification"
          content="aa0cbc62e789441fb12aa9fea6ad053c9e5b42a7d947e334d78aab8abb65886381b035379b6b683027b01f10512a54dac57120ee189c8239dcf1ddb15966c47b"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
