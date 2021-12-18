const { atom } = require("recoil");

const sidebarItemAtom = atom({
  key: "sidebarActiveItem",
  default: "mySpaces",
});

export default sidebarItemAtom;
