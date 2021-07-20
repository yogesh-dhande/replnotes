import splitbee from "@splitbee/web";

export default async (_, inject) => {
  splitbee.init();
  inject("splitbee", splitbee);
};
