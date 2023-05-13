import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptshare",
  description:
    "Enregistrez et partagez vos meilleurs prompts d'IA grâce à Promptshare !",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="fr">
      <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg" />
      <body>
        <Provider>
          <div className="main">
            <div />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
