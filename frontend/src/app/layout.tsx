import type { Metadata } from "next";
import Provider from "./provider"

export const metadata: Metadata = {
  title: "INSERT_TITLE_HERE",
  description: "INSERT_DESCRIPTION_HERE",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head />
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}
