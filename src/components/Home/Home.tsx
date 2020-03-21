import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h1>
        {t("home:welcome")} CORON<span>AQ</span>
      </h1>
      <p>{t("home:intro")}</p>
      <h2>{t("home:how_it_works")}</h2>
      <ul>
        <li>{t("home:list:select_region")}</li>
        <li>{t("home:list:pose_question")}</li>
        <li>{t("home:list:get_answer")}</li>
      </ul>
      <Button variant="contained" color="primary" href="/location">
        {t("home:start")}
      </Button>
    </section>
  );
};
