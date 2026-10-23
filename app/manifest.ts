import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "Shivali Bajaj — Medical Data Scientist",
    short_name:       "Shivali Bajaj",
    description:      "Medical Data Scientist building clinically aware AI systems in healthcare NLP and medical imaging.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#00003C",
    theme_color:      "#00003C",
    icons: [
      {
        src:   "/favicon.ico",
        sizes: "any",
        type:  "image/x-icon",
      },
    ],
  };
}
