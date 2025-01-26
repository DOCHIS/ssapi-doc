import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/ssapi",
    },
    {
      type: "category",
      label: "Partners",
      items: [
        {
          type: "doc",
          id: "api/파트너-목록-조회",
          label: "파트너 목록 조회",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
