"use client";

import Image from "next/image";
import { Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import type { Icon } from "iconsax-react";
import {
  HambergerMenu,
  Category,
  Calendar,
  DocumentText,
  Folder2,
  Book1,
  Note,
} from "iconsax-react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type SidebarKey =
  | "home"
  | "schedule"
  | "protocols"
  | "document-management"
  | "department-news"
  | "knowledge-base"
  | "general-news"
  | "my-schedule"
  | "planner"
  | "settings";

type NavItemProps = {
  label: string;
  icon: Icon;
  active?: boolean;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
};

function NavItem({ label, icon: IconComponent, active, rightIcon, onClick }: NavItemProps) {
  const iconColor = active ? "#4F46E5" : "#64748B";
  const textColor = active ? "#4F46E5" : "#64748B";

  return (
    <Flex
      align="center"
      justify="space-between"
      px="14px"
      py="12px"
      cursor="pointer"
      role="group"
      width="245px"
      onClick={onClick}
    >
      <Flex align="center" gap="12px">
        <Box _groupHover={{ "& svg": { color: "#242424" } }}>
          <IconComponent size={20} color={iconColor} />
        </Box>

        <Text
          fontSize="16px"
          fontWeight={active ? 600 : 500}
          color={textColor}
          _groupHover={{ color: "#242424" }}
        >
          {label}
        </Text>
      </Flex>

      {rightIcon ? (
        <Box color="#64748B" _groupHover={{ color: "#242424" }}>
          {rightIcon}
        </Box>
      ) : null}
    </Flex>
  );
}

type SubNavItemProps = {
  label: string;
  icon: Icon;
  active?: boolean;
  onClick?: () => void;
};

function SubNavItem({ label, icon: IconComponent, active, onClick }: SubNavItemProps) {
  const iconColor = active ? "#5653FC" : "#4E5D69";
  const textColor = active ? "#5653FC" : "#4E5D69";

  return (
    <Flex
      align="center"
      gap="10px"
      px="46px"
      py="8px"
      cursor="pointer"
      role="group"
      width="245px"
      position="relative"
      onClick={onClick}
    >
      {active ? (
        <Box
          position="absolute"
          left="18px"
          top="0"
          bottom="0"
          w="3px"
          borderRadius="999px"
          bg="#5653FC"
        />
      ) : null}

      <Box _groupHover={{ "& svg": { color: "#242424" } }}>
        <IconComponent size={18} color={iconColor} />
      </Box>

      <Text
        fontSize="14px"
        fontWeight={active ? 600 : 500}
        color={textColor}
        _groupHover={{ color: "#242424" }}
      >
        {label}
      </Text>
    </Flex>
  );
}

export function Sidebar() {
  const [scheduleOpen, setScheduleOpen] = useState(true);
  const [activeKey, setActiveKey] = useState<SidebarKey>("home");

  return (
    <Box px="18px" py="18px">
      <Flex align="center" justify="space-between" mb="22px">
        <Image src="/logo.png" alt="Company logo" width={157} height={39} priority />

        <IconButton
          aria-label="Menu"
          variant="ghost"
          w="40px"
          h="40px"
          border="1px solid"
          borderColor="#F0F5FA"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <HambergerMenu size={22} color="#2D3648" />
        </IconButton>
      </Flex>

      <Stack gap="6px">
        <NavItem
          label="Home"
          icon={Category}
          active={activeKey === "home"}
          onClick={() => setActiveKey("home")}
        />

        <NavItem
          label="Schedule"
          icon={Calendar}
          active={activeKey === "schedule"}
          onClick={() => {
            setScheduleOpen((prev) => !prev);
            setActiveKey("schedule");
          }}
          rightIcon={
            <Box
              transform={scheduleOpen ? "rotate(180deg)" : "rotate(0deg)"}
              transition="transform 0.2s ease"
            >
              <FiChevronDown size={18} />
            </Box>
          }
        />

        {scheduleOpen ? (
          <Box position="relative">
            <Box position="absolute" left="19px" top="6px" bottom="6px" w="1px" bg="#E2E8F0" />

            <Stack gap="2px">
              <SubNavItem
                label="My Schedule"
                icon={Note}
                active={activeKey === "my-schedule"}
                onClick={() => setActiveKey("my-schedule")}
              />
              <SubNavItem
                label="Planner"
                icon={Note}
                active={activeKey === "planner"}
                onClick={() => setActiveKey("planner")}
              />
              <SubNavItem
                label="Settings"
                icon={Note}
                active={activeKey === "settings"}
                onClick={() => setActiveKey("settings")}
              />
            </Stack>
          </Box>
        ) : null}

        <NavItem
          label="My Protocol Tasks"
          icon={Note}
          active={activeKey === "protocols"}
          onClick={() => setActiveKey("protocols")}
        />

        <NavItem
          label="Document Management"
          icon={Folder2}
          active={activeKey === "document-management"}
          onClick={() => setActiveKey("document-management")}
        />

        <NavItem
          label="Department News"
          icon={DocumentText}
          active={activeKey === "department-news"}
          onClick={() => setActiveKey("department-news")}
        />

        <NavItem
          label="Knowledge Base"
          icon={Book1}
          active={activeKey === "knowledge-base"}
          onClick={() => setActiveKey("knowledge-base")}
        />

        <NavItem
          label="General News"
          icon={DocumentText}
          active={activeKey === "general-news"}
          onClick={() => setActiveKey("general-news")}
        />
      </Stack>
    </Box>
  );
}
