import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Découvrez, créez et partagez
        <br className="max-md:hidden" />
        <span className="pink_gradient text-center"> des Prompts IA</span>
      </h1>
      <p className="desc text-center">
        Promptshare est un outil open-source de prompts pour{" "}
        <strong>IA génératives</strong> permettant de découvrir, créer et
        partager des prompts créatifs et ingénieux !
      </p>

      <Feed />
    </section>
  );
};

export default Home;
