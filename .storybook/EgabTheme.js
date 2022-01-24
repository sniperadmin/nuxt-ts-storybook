import { create } from "@storybook/theming";
import EgabLogo from '../static/egab.png'

export default create({
  base: 'dark',
  brandTitle: 'Egab',
  brandImage: EgabLogo,
  appBg: '#242424',
  appContentBg: '#333333',
  textColor: '#C76758',
  barSelectedColor: '#77A11D',
});
