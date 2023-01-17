import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import LatoRegularWoff from "../../assets/fonts/lato-v14-latin-regular.woff";
import LatoRegularWoff2 from "../../assets/fonts/lato-v14-latin-regular.woff2";
import LatoBoldWoff from "../../assets/fonts/lato-v14-latin-700.woff";
import LatoBoldWoff2 from "../../assets/fonts/lato-v14-latin-700.woff2";
import ExoRegularWoff from "../../assets/fonts/exo-v10-latin-regular.woff";
import ExoRegularWoff2 from "../../assets/fonts/exo-v10-latin-regular.woff2";
import ExoBoldWoff from "../../assets/fonts/exo-v10-latin-700.woff";
import ExoBoldWoff2 from "../../assets/fonts/exo-v10-latin-700.woff2";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  // regular font
  @font-face {
    font-family: 'Lato';
    src: local('Lato'), local('Lato-Regular'),
    url(${LatoRegularWoff2}) format('woff2'),
    url(${LatoRegularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  // bold font
  @font-face {
    font-family: 'Lato';
    src: local('Lato'), local('Lato-Regular'),
    url(${LatoBoldWoff2}) format('woff2'),
    url(${LatoBoldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
  }

  // heading font
  @font-face {
    font-family: 'Exo';
    src: local('Exo'), local('Exo-Regular'),
    url(${ExoRegularWoff2}) format('woff2'),
    url(${ExoRegularWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  // bold heading font
  @font-face {
    font-family: 'Exo';
    src: local('Exo'), local('Exo-Regular'),
    url(${ExoBoldWoff2}) format('woff2'),
    url(${ExoBoldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
  }

  // You can continue writing global styles here
  body {
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts.body};
  }
`;
