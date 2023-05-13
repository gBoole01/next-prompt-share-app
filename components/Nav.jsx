"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/favicon.svg"
          alt="Prompt share Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptshare</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Créer un prompt
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Se déconnecter
            </button>

            <Link href="/profil">
              <Image
                src={session?.user?.image}
                alt="Image de profil"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Se connecter
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="Image de profil"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profil"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Mon Profil
                </Link>
                <Link
                  href="/creer-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Créer un Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-3 w-full black_btn"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Se connecter
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
