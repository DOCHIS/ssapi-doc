import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "rest-api/ssapi",
    },
    {
      type: "category",
      label: "Alliance API",
      items: [
        {
          type: "doc",
          id: "rest-api/채팅-통계-데이터-제휴",
          label: "채팅 통계 데이터 (제휴)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/후원-통계-데이터-제휴",
          label: "후원 통계 데이터 (제휴)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/미션-통계-데이터-제휴",
          label: "미션 통계 데이터 (제휴)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/스트리머-목록-조회-제휴",
          label: "스트리머 목록 조회 (제휴)",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "rest-api/소켓룸-정보-조회",
          label: "소켓룸 정보 조회",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/소켓룸에-스트리머-등록",
          label: "소켓룸에 스트리머 등록",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "rest-api/소켓룸에서-스트리머-삭제",
          label: "소켓룸에서 스트리머 삭제",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "rest-api/채팅-내역-파싱",
          label: "채팅 내역 파싱",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/후원-내역-파싱",
          label: "후원 내역 파싱",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/미션-내역-파싱",
          label: "미션 내역 파싱",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "rest-api/미션-정산-내역-파싱",
          label: "미션 정산 내역 파싱",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
