"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FilterSearch, Maximize4 } from "iconsax-reactjs";
import { CgMinimize } from "react-icons/cg";

type RosterTab = "all" | "available" | "leave";

type RosterUser = {
  id: string;
  name: string;
  initials: string;
  totalHours: string;
  availableHours: string;
  status: "available" | "leave";
  leaveRange?: string;
  days: Array<{
    label: string;
    color: "green" | "orange";
  }>;
};

const rosterUsers: RosterUser[] = [
  {
    id: "1",
    name: "Elijah Oyin",
    initials: "EO",
    totalHours: "1158.0hrs",
    availableHours: "38.0hrs",
    status: "leave",
    leaveRange: "Jan 8 - Jan 15",
    days: [
      { label: "m", color: "green" },
      { label: "di", color: "green" },
      { label: "w", color: "green" },
      { label: "do", color: "orange" },
      { label: "vr", color: "orange" },
    ],
  },
  {
    id: "2",
    name: "Diane Lane",
    initials: "DL",
    totalHours: "1158.0hrs",
    availableHours: "38.0hrs",
    status: "leave",
    leaveRange: "Jan 12 - Jan 28",
    days: [
      { label: "m", color: "green" },
      { label: "di", color: "green" },
      { label: "w", color: "green" },
      { label: "do", color: "orange" },
      { label: "vr", color: "orange" },
    ],
  },
  {
    id: "3",
    name: "Elijah Oyin",
    initials: "EO",
    totalHours: "1158.0hrs",
    availableHours: "38.0hrs",
    status: "leave",
    leaveRange: "Jan 12 - Jan 20",
    days: [
      { label: "m", color: "green" },
      { label: "di", color: "green" },
      { label: "w", color: "green" },
      { label: "do", color: "orange" },
      { label: "vr", color: "orange" },
    ],
  },
  {
    id: "4",
    name: "Haico De Gast",
    initials: "HG",
    totalHours: "1158.0hrs",
    availableHours: "38.0hrs",
    status: "leave",
    leaveRange: "Jan 2 - Jan 9",
    days: [
      { label: "m", color: "green" },
      { label: "di", color: "green" },
      { label: "w", color: "green" },
      { label: "do", color: "orange" },
      { label: "vr", color: "orange" },
    ],
  },
];

function DayPill({
  label,
  color,
}: {
  label: string;
  color: "green" | "orange";
}) {
  const bg = color === "green" ? "#EAFBF0" : "#FFF1EC";
  const text = color === "green" ? "#16A34A" : "#F97316";

  return (
    <Flex
      px="7px"
      h="22px"
      borderRadius="999px"
      align="center"
      justify="center"
      fontSize="12px"
      fontWeight={600}
      bg={bg}
      color={text}
      textTransform="lowercase"
    >
      {label}
    </Flex>
  );
}

function CountPill({ value }: { value: number }) {
  return (
    <Flex
      px="10px"
      h="26px"
      borderRadius="999px"
      bg="#F1F5F9"
      align="center"
      justify="center"
      fontSize="13px"
      fontWeight={600}
      color="#334155"
    >
      {value}
    </Flex>
  );
}

function StatusPill({ status }: { status: "available" | "leave" }) {
  const isLeave = status === "leave";

  return (
    <Flex
      px="10px"
      h="26px"
      borderRadius="999px"
      bg={isLeave ? "#FFECEC" : "#EAFBF0"}
      color={isLeave ? "#EF4444" : "#16A34A"}
      fontSize="12px"
      fontWeight={600}
      align="center"
      gap="6px"
    >
      <Box w="6px" h="6px" borderRadius="999px" bg="currentColor" />
      {isLeave ? "On leave" : "Available"}
    </Flex>
  );
}

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Flex
      align="center"
      gap="10px"
      px="6px"
      pb="10px"
      cursor="pointer"
      borderBottom={active ? "2px solid #5653FC" : "2px solid transparent"}
      color={active ? "#5653FC" : "#64748B"}
      fontWeight={active ? 700 : 500}
      fontSize="14px"
      onClick={onClick}
      userSelect="none"
    >
      {label}
      <CountPill value={count} />
    </Flex>
  );
}

export function RosterPanel() {
  const [activeTab, setActiveTab] = useState<RosterTab>("leave");
  const [search, setSearch] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const counts = useMemo(() => {
    const all = rosterUsers.length;
    const available = rosterUsers.filter((u) => u.status === "available").length;
    const leave = rosterUsers.filter((u) => u.status === "leave").length;

    return { all, available, leave };
  }, []);

  const filteredUsers = useMemo(() => {
    const base =
      activeTab === "all"
        ? rosterUsers
        : rosterUsers.filter((u) => u.status === activeTab);

    const q = search.trim().toLowerCase();
    if (!q) return base;

    return base.filter((u) => u.name.toLowerCase().includes(q));
  }, [activeTab, search]);

  function toggleMinimize() {
    setIsCollapsed((prev) => !prev);
  }

  function toggleFullscreen() {
    setIsFullscreen((prev) => !prev);
    setIsCollapsed(false);
  }

  const PanelContent = (
    <Box
      w="320px"
      bg="white"
      borderRadius="18px"
      border="1px solid"
      borderColor="#E6EEF7"
      overflow="hidden"
      boxShadow="0px 10px 25px rgba(15, 23, 42, 0.06)"
    >
      {/* HEADER */}
      <Flex
        px="18px"
        py="16px"
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="#EEF2F7"
      >
        <Text fontSize="18px" fontWeight={700} color="#0F172A">
          Roster
        </Text>

        <HStack gap="8px">
          <Button
            variant="ghost"
            w="36px"
            h="36px"
            minW="36px"
            borderRadius="10px"
            border="1px solid"
            borderColor="#EEF2F7"
            bg="#F8FAFC"
            _hover={{ bg: "#F1F5F9" }}
            onClick={toggleMinimize}
          >
            <CgMinimize size={18} color="#334155" />
          </Button>

          <Button
            variant="ghost"
            w="36px"
            h="36px"
            minW="36px"
            borderRadius="10px"
            border="1px solid"
            borderColor="#EEF2F7"
            bg="#F8FAFC"
            _hover={{ bg: "#F1F5F9" }}
            onClick={toggleFullscreen}
          >
            <Maximize4 size={18} color="#334155" />
          </Button>
        </HStack>
      </Flex>

      {/* BODY */}
      {!isCollapsed && (
        <Box px="18px" py="16px">
          {/* SEARCH + FILTER */}
          <Flex gap="10px" align="center">
            <Flex
              flex="1"
              align="center"
              gap="10px"
              px="12px"
              h="42px"
              border="1px solid"
              borderColor="#D9E5F2"
              borderRadius="12px"
              bg="white"
            >
              <FiSearch size={18} color="#94A3B8" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                border="none"
                outline="none"
                p="0"
                h="full"
                fontSize="14px"
                _focus={{ boxShadow: "none" }}
              />
            </Flex>

            <Button
              variant="outline"
              borderColor="#D9E5F2"
              borderRadius="12px"
              w="46px"
              h="42px"
              minW="46px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FilterSearch size={18} />
            </Button>
          </Flex>

          {/* TABS */}
          <Flex mt="16px" gap="18px" borderBottom="1px solid" borderColor="#EEF2F7">
            <TabButton
              label="All"
              count={counts.all}
              active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            />
            <TabButton
              label="Available"
              count={counts.available}
              active={activeTab === "available"}
              onClick={() => setActiveTab("available")}
            />
            <TabButton
              label="On Leave"
              count={counts.leave}
              active={activeTab === "leave"}
              onClick={() => setActiveTab("leave")}
            />
          </Flex>

          {/* LIST */}
          <VStack mt="16px" gap="14px" align="stretch">
            {filteredUsers.map((u) => (
              <Box
                key={u.id}
                border="1px solid"
                borderColor="#D9E5F2"
                borderRadius="16px"
                px="14px"
                py="14px"
                bg="white"
              >
                <Flex justify="space-between" align="flex-start">
                  <Flex gap="12px">
                    <Flex
                      w="44px"
                      h="44px"
                      borderRadius="999px"
                      bg="#F1F5F9"
                      align="center"
                      justify="center"
                      fontWeight={700}
                      color="#334155"
                      fontSize="14px"
                      flexShrink={0}
                    >
                      {u.initials}
                    </Flex>

                    <Box>
                      <Text fontSize="15px" fontWeight={700} color="#0F172A">
                        {u.name}
                      </Text>

                      <HStack mt="6px" gap="8px">
                        <Flex
                          px="10px"
                          h="24px"
                          borderRadius="999px"
                          bg="#F1F5F9"
                          align="center"
                          justify="center"
                          fontSize="12px"
                          fontWeight={600}
                          color="#334155"
                        >
                          {u.totalHours}
                        </Flex>

                        <Flex
                          px="10px"
                          h="24px"
                          borderRadius="999px"
                          bg="#F1F5F9"
                          align="center"
                          justify="center"
                          fontSize="12px"
                          fontWeight={600}
                          color="#334155"
                        >
                          {u.availableHours}
                        </Flex>
                      </HStack>
                    </Box>
                  </Flex>

                  <StatusPill status={u.status} />
                </Flex>

                <Flex mt="12px" justify="space-between" align="center">
                  <Flex gap="6px" wrap="wrap">
                    {u.days.map((d, idx) => (
                      <DayPill key={`${u.id}-${idx}`} label={d.label} color={d.color} />
                    ))}
                  </Flex>

                  {u.leaveRange && (
                    <Flex
                      px="10px"
                      h="24px"
                      borderRadius="999px"
                      bg="#FFECEC"
                      color="#EF4444"
                      fontSize="12px"
                      fontWeight={600}
                      align="center"
                      justify="center"
                    >
                      {u.leaveRange}
                    </Flex>
                  )}
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );

  if (isFullscreen) {
    return (
      <Flex
        position="fixed"
        inset="0"
        zIndex={9999}
        bg="rgba(15, 23, 42, 0.25)"
        align="center"
        justify="center"
        p="18px"
        onClick={() => setIsFullscreen(false)}
      >
        <Box onClick={(e) => e.stopPropagation()}>{PanelContent}</Box>
      </Flex>
    );
  }

  return PanelContent;
}
