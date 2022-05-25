import { create } from "@storybook/theming";
import NashLogo from '../static/nash-dev-dark.png'

export default create({
  base: 'dark',
  brandTitle: 'Egab',
  brandImage: NashLogo,
  appBg: '#242424',
  appContentBg: '#333333',
  textColor: '#C76758',
  barSelectedColor: '#77A11D',
});
