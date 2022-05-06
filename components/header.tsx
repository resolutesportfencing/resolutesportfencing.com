import React from "react";
import Link from "next/link";
import { Container } from "./container";
import { ThemeContext } from "./theme";
import { Logo } from "./logo";
import { useEffect } from 'react'
import { useRouter } from "next/router";
import * as ga from '../lib/ga'


export const Header = ({ data }) => {
  const theme = React.useContext(ThemeContext);

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-700 dark:to-gray-800",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 dark:border-blue-700",
    teal: "border-b-3 border-teal-200 dark:border-teal-700",
    green: "border-b-3 border-green-200 dark:border-green-700",
    red: "border-b-3 border-red-300 dark:border-red-700",
    pink: "border-b-3 border-pink-200 dark:border-pink-700",
    purple: "border-b-3 border-purple-200 dark:border-purple-700",
    orange: "border-b-3 border-orange-200 dark:border-orange-700",
    yellow: "border-b-3 border-yellow-300 dark:border-yellow-600",
  };

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <div className={`bg-gradient-to-b ${headerColorCss}`}>
      <Container className="py-0 relative z-10 max-w-full sm:max-w-8xl">
        <div className="flex items-center justify-between">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link href="/" passHref>
              <a className="flex items-center">
                <Logo />{"    "}
                <div className="w-full text-xs sm:text-base">
                Resolute Sport Fencing
                </div>
              </a>
            </Link>
          </h4>
          <ul className="flex gap-1 sm:gap-8 lg:gap-10">
            {data.nav &&
              data.nav.map((item, i) => {
                let route =
                  (router.asPath === "/" ? "home" : router.asPath || "home").split('/').filter(s => s)
                const href = (item.href == '' && ['home']) || item.href.split('/');
                const activeItem = route && route.length && href[0] == route[0];
                return (
                  <li
                    key={`${item.label}-${i}`}
                    className={activeItem ? activeItemClasses[theme.color] : ""}
                  >
                    <Link href={`/${item.href || "home"}`}>
                      <a className="select-none	text-xs sm:text-base inline-block tracking-wide font-regular transition duration-150 ease-out opacity-70 hover:opacity-100 py-8">
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary" ? `via-white` : `via-black dark:via-white`
          } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
        ></div>
      </Container>
    </div>
  );
};
