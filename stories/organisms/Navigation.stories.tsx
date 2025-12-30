import Navigation, { MenuItemProps } from "@/components/layout/Navigation";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Navigation> = {
  title: "Components/Layout/Navigation",
  component: Navigation,
  globals: { theme: "dark" },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["master", "admin"],
      description: "사용자 역할에 따른 네비게이션 타입",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "admin" },
      },
    },
    ...{
      currentPath: {
        control: "text",
        description: "현재 활성화된 경로를 테스트합니다.",
        defaultValue: "/admin",
        table: {
          type: { summary: "string" },
          category: "Testing",
        },
      },
    },
    // 현재 경로를 직접 입력해서 테스트할 수 있도록 가상 props 추가
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative bg-white dark dark:bg-black">
        <div className="p-4 text-gray-500">페이지 컨텐츠 영역...</div>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// 메뉴 데이터 (Mock)
const mockAdminMenus = [
  { label: "통계", icon: "admin/menu_statisctics", url: "/admin" },
  { label: "관리", icon: "admin/menu_management", url: "/admin/management" },
  { label: "신청서", icon: "admin/menu_register", url: "/admin/register" },
  {
    label: "대시보드",
    icon: "admin/menu_dashboards",
    url: "/admin/dashboards",
  },
];

const mockMasterMenus = [
  { label: "홈", icon: "menu_home", url: "/master" },
  { label: "리스트", icon: "menu_list", url: "/master/list" },
  { label: "검색", icon: "menu_search", url: "/master/search" },
  {
    label: "설정",
    icon: "menu_settings",
    url: "/master/setting",
  },
];

// 1. 기존 MenuItemProps와 커스텀 인자(currentPath)를 합친 타입을 정의합니다.
type NavigationStoryArgs = MenuItemProps & { currentPath: string };

// 2. Story 타입을 위에서 만든 확장 타입으로 지정합니다.
type Story = StoryObj<NavigationStoryArgs>;

export const Interactive: Story = {
  args: {
    role: "admin",
    menus: mockAdminMenus,
    currentPath: "/admin", // 초기값: 홈 활성화
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args, { parameters }) => {
    parameters.nextjs = {
      ...parameters.nextjs,
      navigation: {
        pathname: args.currentPath,
      },
    };

    const selectedMenus =
      args.role === "admin" ? mockAdminMenus : mockMasterMenus;

    return (
      <div className="relative bg-white dark:bg-black">
        <div className="p-4 text-gray-400">
          현재 주소창 위치:{" "}
          <span className="font-bold text-blue-500">{args.currentPath}</span>
        </div>
        <Navigation {...args} menus={selectedMenus} />
      </div>
    );
  },
};

// Admin
export const AdminHome: Story = {
  args: {
    role: "admin",
    menus: mockAdminMenus,
    currentPath: "/admin",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    nextjs: {
      navigation: {
        pathname: "/admin",
      },
    },
    docs: {
      description: {
        story: "Admin 역할의 홈 화면입니다. 첫 번째 메뉴가 활성화됩니다.",
      },
    },
  },
};

export const MasterHome: Story = {
  args: {
    role: "master",
    menus: mockMasterMenus,
    currentPath: "/master",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    nextjs: {
      navigation: {
        pathname: "/master",
      },
    },
    docs: {
      description: {
        story: "Master 역할의 홈 화면입니다.",
      },
    },
  },
};

// // 다크모드 테스트
export const DarkMode: Story = {
  args: {
    role: "admin",
    menus: mockAdminMenus,
    currentPath: "/admin",
  },
  globals: { theme: "dark" },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    nextjs: {
      navigation: {
        pathname: "/admin",
      },
    },
    docs: {
      description: {
        story: "다크모드에서의 Admin 네비게이션입니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="relative bg-white dark:bg-black">
          <div className="p-4 text-gray-500 dark:text-gray-400">
            다크모드 테스트 - 페이지 컨텐츠 영역...
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
};
