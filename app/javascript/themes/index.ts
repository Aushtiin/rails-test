import "styled-components";
import { baseTheme } from "./base";

export { baseTheme };

type Theme = typeof baseTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
