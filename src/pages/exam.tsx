import { NextSeo } from "next-seo";
import LabExamLayout from "exam/layouts/labExam";
import { LabExamModule } from "exam/modules/labExam";

//import scss for exam

import { theme } from "exam/assets/muiStyles/styles";
import { ThemeProvider } from "@material-ui/core";

const Home = () => {
  return (
    <div>
      <NextSeo
        title="Welcome 😉🤫"
        description="Psna lab exam answers for 4th years, all the best guys"
        canonical="https://labexam.vercel.app/"
        additionalMetaTags={[
          {
            name: `Au lab`,
            content: `lab exam answer`,
          },
        ]}
        openGraph={{
          title: "Au Lab Exam",
          type: `website`,
          images: [
            {
              url: `https://www.ndtv.com/education/cache-static/media/presets/625X400/presets/900X600/article_images/2021/6/5/exam001.webp`,
              width: 800,
              height: 600,
              alt: `Og Image Alt`,
            },
            {
              url: `https://www.ndtv.com/education/cache-static/media/presets/625X400/presets/900X600/article_images/2021/6/5/exam001.webp`,
              width: 900,
              height: 800,
              alt: `Og Image Alt Second`,
            },
          ],
          site_name: `Au Lab Exam`,
        }}
      />
      <div style={{ backgroundColor: "black" }}>
        <ThemeProvider theme={theme}>
          <LabExamLayout>
            <LabExamModule />
          </LabExamLayout>
        </ThemeProvider>
      </div>
    </div>
  );
};
export default Home;
