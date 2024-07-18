import HamburgerMenuIcon from "./pack/HamburgerMenu";

const iconPack = {
  HamburgerMenuIcon: HamburgerMenuIcon,
};

export { iconPack };

export type TIconPack = keyof typeof iconPack;

export const iconNames = Object.keys(iconPack) as TIconPack[];
