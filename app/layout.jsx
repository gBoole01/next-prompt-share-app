import "@styles/globals.css";

export const metadata = {
  title: "Prompt Share App",
  description:
    "Prompt Share App is a web app that allows you to share prompts with your friends.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
