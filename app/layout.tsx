import type { Metadata } from "next";
import "./globals.css";
import TraceNav from "@/src/components/layout/TraceNav";

// 사이트 전체에 공통으로 적용되는 메타 정보다.
export const metadata: Metadata = {
  title: "TRACE",
  description: "Interfaces leave traces.",
};

// 모든 페이지를 감싸는 최상위 레이아웃이다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TraceNav />
        {children}
      </body>
    </html>
  );
}
